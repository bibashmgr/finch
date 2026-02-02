import {
  DiskHealthIndicator,
  HealthCheckService,
  HealthIndicatorResult,
  MemoryHealthIndicator,
} from "@nestjs/terminus";
import { sql } from "drizzle-orm";
import { Injectable, ServiceUnavailableException } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class HealthService {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  private async isDatabaseHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.db.execute(sql`SELECT 1`);

      return {
        [key]: {
          status: "up" as const,
          message: "Database is available",
        },
      };
    } catch (error) {
      return {
        [key]: {
          status: "down" as const,
          message:
            error instanceof Error ? error.message : "Database check failed",
        },
      };
    }
  }

  private formatHealthCheckErrors(errors: unknown): string {
    if (typeof errors !== "object" || errors === null) {
      return "Health check failed";
    }

    const details: string[] = [];
    for (const [key, value] of Object.entries(errors)) {
      if (typeof value === "object" && value !== null) {
        const info = value as Record<string, unknown>;
        const rawMessage = info.message ?? info.error ?? "check failed";
        const message =
          typeof rawMessage === "string"
            ? rawMessage
            : JSON.stringify(rawMessage);
        details.push(`${key}: ${message}`);
      }
    }

    return details.length > 0 ? details.join("; ") : "Health check failed";
  }

  async check() {
    try {
      const result = await this.health.check([
        // Database health
        () => this.isDatabaseHealthy("database"),
        // Heap memory (max 150MB)
        () => this.memory.checkHeap("memory_heap", 150 * 1024 * 1024),
        // RSS memory (max 300MB)
        () => this.memory.checkRSS("memory_rss", 300 * 1024 * 1024),
        // Disk usage (max 90%)
        () =>
          this.disk.checkStorage("storage", {
            path: "/",
            thresholdPercent: 0.9,
          }),
      ]);
      return result.details;
    } catch (error) {
      if (error instanceof ServiceUnavailableException) {
        const response = error.getResponse() as Record<string, unknown>;
        const detail = this.formatHealthCheckErrors(response.error);
        throw new ServiceUnavailableException(detail);
      }
      throw error;
    }
  }
}
