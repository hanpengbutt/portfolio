import {
  getAllPosts,
  getPostById,
  getPostHtml,
  getPostHeadings,
} from "@/utils/posts";
import { notFound } from "next/navigation";
import Frontmatter from "@/app/blog/_components/Frontmatter";
import Toc from "@/app/blog/_components/Toc";
import Comments from "@/app/blog/_components/Comments";
import "@/app/blog/_components/markdown.css";
import "highlight.js/styles/github-dark.css";

export const dynamicParams = false;

// SSG를 위해 빌드 시점에 생성할 파라미터(category, postId) 배열을 리턴
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.meta.tag,
    postId: post.id,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; postId: string }>;
}) {
  const { postId } = await params;
  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  // 마크다운 문자열을 HTML 문자열로 변환
  const contentHtml = await getPostHtml(post.content);
  // 목차 추출
  const headings = getPostHeadings(post.content);

  return (
    <div className="flex w-full justify-center">
      <div className="relative w-170 py-7">
        <Frontmatter
          title={post.meta.title}
          description={post.meta.description}
          date={post.meta.date}
          tag={post.meta.tag}
        />

        <div
          className="markdown-body mt-10 w-full"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <Comments />

        {/* 목차 (TOC) 영역 */}
        <aside className="pointer-events-none absolute top-0 left-[calc(100%+62px)] hidden h-full w-60 xl:block">
          <div className="pointer-events-auto sticky top-20 pt-15">
            <Toc headings={headings} />
          </div>
        </aside>
      </div>
    </div>
  );
}
