import { getAllPostIds, getPostById, getPostHtml } from "@/utils/posts";
import { notFound } from "next/navigation";
import Frontmatter from "../_components/Frontmatter";
import "../_components/markdown.css";
import "highlight.js/styles/github-dark.css";

export const dynamicParams = false;

// SSG를 위해 빌드 시점에 생성할 파라미터(postId) 배열을 리턴
export function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((postId) => ({
    postId: postId,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = getPostById(postId);

  if (!post) {
    notFound();
  }

  // 마크다운 문자열을 HTML 문자열로 변환
  const contentHtml = await getPostHtml(post.content);

  return (
    <div className="flex w-full justify-center">
      <div className="w-170 py-7">
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
      </div>
    </div>
  );
}
