import { cn } from "@/utils/cn";
import Tag from "./Tag";
import { formatDate } from "@/utils/date";

export interface BlogCardProps {
  title: string;
  description: string;
  tag: string;
  date: Date | string;
  className?: string;
}

export default function BlogCard({
  title,
  description,
  tag,
  date,
  className = "",
}: BlogCardProps) {
  return (
    <div
      className={cn(
        "border-border-default flex h-80 w-full max-w-90 flex-col items-start justify-between overflow-hidden border border-solid bg-white px-5 py-4",
        className,
      )}
    >
      {/* Image Placeholder */}
      <div className="border-border-default h-35 w-full shrink-0 border border-solid" />

      {/* Title */}
      <h3 className="text-heading-md text-text-primary w-full truncate">
        {title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-text-secondary line-clamp-2 w-full">
        {description}
      </p>

      {/* Footer */}
      <div className="flex w-full shrink-0 items-center justify-between">
        <span className="text-body-sm text-text-primary">
          {formatDate(date)}
        </span>
        <Tag>{tag}</Tag>
      </div>
    </div>
  );
}
