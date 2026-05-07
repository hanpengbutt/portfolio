import { cn } from "@/utils/cn";
import Link from "next/link";

interface SidebarProps {
  categories: string[];
  activeCategory?: string;
  className?: string;
}

export default function Sidebar({
  categories,
  activeCategory = "ALL",
  className = "",
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "border-border-default text-body-md text-text-primary flex h-full w-full flex-col items-start gap-8 border-r border-solid px-7 py-8",
        className,
      )}
    >
      {categories.map((category) => (
        <Link
          key={category}
          href={category === "ALL" ? "/blog" : `/blog/${category}`}
          className={cn(
            "cursor-pointer",
            activeCategory === category
              ? "text-text-primary underline underline-offset-4"
              : "text-text-secondary",
          )}
        >
          {category}
        </Link>
      ))}
    </aside>
  );
}
