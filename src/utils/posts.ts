import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import githubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "_posts");

export interface PostMeta {
  title: string;
  description: string;
  tag: string;
  date: string;
}

export interface Post {
  id: string; // The filename without .md
  meta: PostMeta;
  content: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// 재귀적으로 폴더 내의 모든 .md 파일 경로를 찾는 헬퍼 함수
function getAllFilesRecursively(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFilesRecursively(filePath));
    } else if (file.endsWith(".md")) {
      results.push(filePath);
    }
  });

  return results;
}

// 모든 포스트의 ID(파일명)를 가져오는 함수
export function getAllPostIds(): string[] {
  const files = getAllFilesRecursively(POSTS_DIR);
  // 파일명만 추출하여 id로 사용 (파일명이 중복되지 않는다고 가정)
  return files.map((file) => path.basename(file, ".md"));
}

// 특정 ID의 포스트 내용과 메타데이터를 가져오는 함수
export function getPostById(id: string): Post | null {
  try {
    // URL에 한글이 포함된 경우 인코딩되어 들어오므로 디코딩 처리
    const decodedId = decodeURIComponent(id);
    const files = getAllFilesRecursively(POSTS_DIR);
    const fullPath = files.find(
      (file) => path.basename(file, ".md") === decodedId,
    );

    if (!fullPath) {
      console.log(
        `[getPostById] 포스트를 찾을 수 없습니다. (ID: ${id}, Decoded: ${decodedId})`,
      );
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id: decodedId,
      meta: data as PostMeta,
      content,
    };
  } catch (error) {
    console.error("[getPostById] Error:", error);
    return null;
  }
}

export function getPostHeadings(content: string): TocItem[] {
  const headingRegex = /^(#{1,2})\s+(.+)$/gm;

  const headings: TocItem[] = [];
  const slugger = new githubSlugger();

  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];

    const slug = slugger.slug(text);

    headings.push({
      id: slug,
      text,
      level,
    });
  }

  return headings;
}


export async function getPostHtml(content: string): Promise<string> {
  // rehype-slug 라이브러리를 동적으로 가져와야 할 수도 있습니다 (ESM)
  // 여기선 일단 파이프라인에 추가하는 방향으로 제안합니다.
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content);
  return processedContent.toString();
}

// 모든 포스트 목록을 가져오는 함수 (메타데이터 포함)
export function getAllPosts(): Post[] {
  const files = getAllFilesRecursively(POSTS_DIR);
  const posts = files
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const id = path.basename(filePath, ".md");

      return {
        id,
        meta: data as PostMeta,
        content,
      };
    })
    .sort((a, b) => {
      return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
    });

  return posts;
}

// 모든 카테고리(태그) 목록을 가져오는 함수
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const tags = posts.map((post) => post.meta.tag).filter(Boolean);
  const uniqueTags = Array.from(new Set(tags)).sort((a, b) =>
    a.localeCompare(b),
  );
  return ["ALL", ...uniqueTags];
}
