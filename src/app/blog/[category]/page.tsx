import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/utils/posts";
import BlogCard from "@/app/blog/_components/BlogCard";
import Sidebar from "@/app/blog/_components/Sidebar";

export function generateStaticParams() {
  const categories = getAllCategories();
  // "ALL"은 루트 /blog에서 처리하므로 제외
  return categories
    .filter((category) => category !== "ALL")
    .map((category) => ({
      category: category,
    }));
}

export default async function CategoryBlogPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: encodedCategory } = await params;
  const category = decodeURIComponent(encodedCategory);

  const allPosts = getAllPosts();
  const categories = getAllCategories();

  const filteredPosts = allPosts.filter((post) => post.meta.tag === category);

  return (
    <div className="grid h-[calc(100vh-100px)] w-full grid-cols-[240px_1fr]">
      {/* Sidebar Area */}
      <div className="h-full">
        <Sidebar categories={categories} activeCategory={category} />
      </div>

      {/* Blog List Area */}
      <div className="h-full overflow-y-auto p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.meta.tag}/${post.id}`}>
              <BlogCard
                title={post.meta.title}
                description={post.meta.description}
                tag={post.meta.tag}
                date={post.meta.date}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
