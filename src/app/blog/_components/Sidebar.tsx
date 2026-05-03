import { cn } from "@/utils/cn";

interface SidebarProps {
  categories: string[];
  className?: string;
}

export default function Sidebar({ categories, className = "" }: SidebarProps) {
  return (
    <aside
      className={cn(
        "border-border-default text-body-md text-text-primary flex h-full w-full flex-col items-start gap-8 border-r border-solid px-7 py-8",
        className,
      )}
    >
      {categories.map((category) => (
        <p key={category} className="cursor-pointer">
          {category}
        </p>
      ))}
    </aside>
  );
}
