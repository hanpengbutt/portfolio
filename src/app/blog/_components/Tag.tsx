import { cn } from "@/utils/cn";

export default function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-border-default flex items-center justify-center rounded-[50%] border border-solid px-4 py-2",
        className,
      )}
    >
      <span className="text-body-sm text-text-primary whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}
