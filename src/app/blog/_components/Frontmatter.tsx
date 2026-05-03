import Tag from "./Tag";
import { formatDate } from "@/utils/date";

interface FrontmatterProps {
  title: string;
  description: string;
  date: string | Date;
  tag: string;
}

export default function Frontmatter({
  title,
  description,
  date,
  tag,
}: FrontmatterProps) {
  return (
    <div className="flex w-full flex-col items-start gap-6 border-b border-solid border-border-subtle pb-5">
      <h1 className="w-full text-display-xl text-text-primary">{title}</h1>
      <p className="w-full text-body-md text-text-secondary">{description}</p>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-5 text-body-md text-text-primary">
          <a
            href="https://github.com/hanpengbutt"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer"
          >
            @hanpengbutt
          </a>
          <span>{formatDate(date)}</span>
        </div>
        <Tag>{tag}</Tag>
      </div>
    </div>
  );
}
