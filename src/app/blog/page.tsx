import Link from "next/link";
import { getAllCategories, getAllPosts } from "@/utils/posts";
import BlogCard from "./_components/BlogCard";
import Sidebar from "./_components/Sidebar";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="grid h-[calc(100vh-100px)] w-full grid-cols-[240px_1fr]">
      {/* Sidebar Area */}
      <div className="h-full">
        <Sidebar categories={categories} activeCategory="ALL" />
      </div>

      {/* Blog List Area */}
      <div className="h-full overflow-y-auto p-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
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
