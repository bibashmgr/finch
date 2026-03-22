import { Injectable } from "@nestjs/common";

import { ReportRepository } from "@/modules/report/report.repository";
import { ReportPeriodEnum } from "@/modules/report/entities/report-period.enum";

export interface ReportItem {
  label: string;
  income: number;
  expense: number;
}

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async getReports(
    userId: string,
    period: ReportPeriodEnum,
  ): Promise<ReportItem[]> {
    const { since, truncation, labels } = this.buildPeriodConfig(period);
    const rows = await this.reportRepository.getGroupedTotals(
      userId,
      since,
      truncation,
    );
    return this.mergeWithLabels(labels, rows);
  }

  private buildPeriodConfig(period: ReportPeriodEnum) {
    const now = new Date();

    if (period === ReportPeriodEnum.week) {
      const since = new Date(now);
      since.setDate(since.getDate() - 6);
      since.setHours(0, 0, 0, 0);
      return {
        since,
        truncation: "day" as const,
        labels: this.getWeekLabels(),
      };
    }

    if (period === ReportPeriodEnum.month) {
      const since = new Date(now);
      since.setMonth(since.getMonth() - 5);
      since.setDate(1);
      since.setHours(0, 0, 0, 0);
      return {
        since,
        truncation: "month" as const,
        labels: this.getMonthLabels(),
      };
    }

    const since = new Date(now);
    since.setFullYear(since.getFullYear() - 4);
    since.setMonth(0, 1);
    since.setHours(0, 0, 0, 0);
    return { since, truncation: "year" as const, labels: this.getYearLabels() };
  }

  private getWeekLabels(): string[] {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString("en-US", { weekday: "long" });
    });
  }

  private getMonthLabels(): string[] {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setDate(1);
      d.setMonth(d.getMonth() - (5 - i));
      return d.toLocaleDateString("en-US", { month: "long" });
    });
  }

  private getYearLabels(): string[] {
    const year = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => String(year - (4 - i)));
  }

  private mergeWithLabels(
    labels: string[],
    rows: { label: string; income: string | null; expense: string | null }[],
  ): ReportItem[] {
    const map = new Map(rows.map((r) => [r.label.trim(), r]));

    return labels.map((label) => {
      const row = map.get(label);
      return {
        label,
        income: Number(row?.income ?? 0),
        expense: Number(row?.expense ?? 0),
      };
    });
  }
}
