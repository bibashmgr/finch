import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export function SettingItem({
  title,
  href,
  value = "",
}: {
  title: string;
  href: string;
  value?: string;
}) {
  return (
    <Link href={href} prefetch={false}>
      <div className="flex justify-between items-center gap-4 py-3">
        <div className="flex items-center gap-4">
          <p className="text-sm text-semibold">{title}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">{value}</p>
          <ChevronRightIcon className="size-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
