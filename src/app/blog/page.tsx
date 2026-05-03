import BlogCard from "./_components/BlogCard";
import Sidebar from "./_components/Sidebar";

const MOCK_BLOGS = [
  {
    id: 1,
    title: "짧은 제목",
    description: "짧은 설명입니다.",
    tag: "React",
    date: "2026-04-28",
  },
  {
    id: 2,
    title: "조금 더 긴 제목을 가진 블로그 포스트입니다",
    description:
      "이것은 중간 길이의 설명입니다. 두 줄 정도로 렌더링될 수 있습니다. UI가 깨지지 않는지 확인합니다.",
    tag: "JavaScript",
    date: "2026-05-01T14:30:00Z",
  },
  {
    id: 3,
    title:
      "아주 아주 긴 제목을 가진 블로그 포스트입니다. 말줄임표가 제대로 적용되는지 확인하기 위한 테스트용 데이터입니다.",
    description:
      "이 설명은 매우 깁니다. 세 줄 이상으로 넘어갈 수 있으며, BlogCard 컴포넌트 내부의 line-clamp-2 클래스 덕분에 두 줄까지만 보여지고 나머지는 말줄임표(...)로 처리되어야 정상입니다. 제대로 작동하는지 확인해보세요.",
    tag: "Frontend Development",
    date: new Date("2026-12-25"),
  },
  {
    id: 4,
    title: "Next.js App Router 완벽 가이드",
    description:
      "Next.js 13부터 도입된 App Router의 핵심 개념과 사용법을 알아봅니다.",
    tag: "Next.js",
    date: "2025-01-15",
  },
  {
    id: 5,
    title: "Tailwind CSS v4 변경점 리뷰",
    description:
      "새롭게 출시된 Tailwind CSS v4의 주요 변경점과 마이그레이션 방법을 정리했습니다.",
    tag: "CSS",
    date: "2024-11-11",
  },
  {
    id: 6,
    title: "Figma Dev Mode 100% 활용하기",
    description:
      "디자인 토큰을 추출하고 코드로 변환하는 가장 효율적인 워크플로우를 소개합니다.",
    tag: "Design",
    date: "2026-05-03",
  },
];

export default function BlogPage() {
  return (
    <div className="grid h-[calc(100vh-100px)] w-full grid-cols-[240px_1fr]">
      {/* Sidebar Area */}
      <div className="h-full">
        <Sidebar
          categories={[
            "ALL",
            "React",
            "JavaScript",
            "Next.js",
            "CSS",
            "Design",
          ]}
        />
      </div>

      {/* Blog List Area */}
      <div className="h-full overflow-y-auto p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {MOCK_BLOGS.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              description={blog.description}
              tag={blog.tag}
              date={blog.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
