"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export interface TocHeading {
  id: string;
  text: string;
  level: number; // 1 or 2
}

interface TocProps {
  headings: TocHeading[];
}

export default function Toc({ headings }: TocProps) {
  const [activeId, setActiveId] = useState<string>("");

  // 현재 스크롤 위치에 있는 헤딩을 감지하여 activeId 업데이트
  useEffect(() => {
    let ticking = false;

    const updateActiveId = () => {
      const scrollThreshold = 100; // 헤더 높이(80px) + 여유 공간
      let lastActiveId = "";

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        // 헤딩의 상단 위치가 임계점보다 위로 올라갔다면 해당 헤딩을 활성 후보로 갱신
        if (rect.top <= scrollThreshold) {
          lastActiveId = heading.id;
        } else {
          // 리스트 순서대로 체크하므로, 임계점보다 아래에 있는 요소를 만나면 중단
          break;
        }
      }

      setActiveId(lastActiveId);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveId);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateActiveId(); // 초기 로드 시 실행

    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  // 1. 그룹화 로직: H1을 기준으로 섹션을 나눕니다.
  const sections = headings.reduce(
    (acc, heading) => {
      if (heading.level === 1) {
        // 새로운 H1 섹션 시작
        acc.push({ ...heading, children: [] as TocHeading[] });
      } else {
        const lastSection = acc[acc.length - 1];
        // 바로 직전에 H1 섹션이 있었다면 그 자식으로 추가
        if (lastSection && lastSection.level === 1) {
          lastSection.children.push(heading);
        } else {
          // 앞에 H1이 없었다면, 이 H2 자체가 하나의 독립 섹션이 됨 (데이터 누락 방지)
          acc.push({ ...heading, children: [] as TocHeading[] });
        }
      }
      return acc;
    },
    [] as (TocHeading & { children: TocHeading[] })[],
  );

  return (
    <nav className="flex w-full flex-col gap-4">
      {/* TOC (gap-4) */}
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-3">
          {/* Section (gap-3) */}
          <a
            href={`#${section.id}`}
            className={cn(
              "text-body-md hover:text-text-primary transition-colors",
              section.level === 2 && "text-body-sm pl-7", // 부모 없는 H2일 경우 들여쓰기
              activeId === section.id
                ? "text-text-primary font-medium"
                : "text-text-secondary font-light",
            )}
          >
            {section.text}
          </a>

          {/* SubList (gap-3) */}
          {section.children.length > 0 && (
            <div className="flex flex-col gap-3 pl-7">
              {section.children.map((child) => (
                <a
                  key={child.id}
                  href={`#${child.id}`}
                  className={cn(
                    "text-body-sm hover:text-text-primary transition-colors",
                    activeId === child.id
                      ? "text-text-primary font-medium"
                      : "text-text-secondary",
                  )}
                >
                  {child.text}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
