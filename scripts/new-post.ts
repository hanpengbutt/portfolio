import fs from "fs";
import path from "path";
import { generateSlug } from "../src/utils/slug";

const [, , tag, ...titleWords] = process.argv;
const title = titleWords.join(" ");

if (!tag || !title) {
  console.error("❌ 사용법: npm run new-post <tag> \"<title>\"");
  console.error("💡 예시: npm run new-post Next.js \"Next.js 완전 정리\"");
  process.exit(1);
}

// 1. Slug 생성
const slug = generateSlug(title);

// 2. 작성 날짜 생성 (YYYY-MM-DD 형식)
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const dateStr = `${year}-${month}-${day}`;

// 3. 마크다운 Frontmatter 템플릿
const content = `---
title: "${title}"
description: ""
tag: "${tag}"
date: "${dateStr}"
---

`;

// 4. 카테고리 폴더가 없다면 생성
const dirPath = path.join(process.cwd(), "_posts", tag);
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// 5. 파일 쓰기
const filePath = path.join(dirPath, `${slug}.md`);
fs.writeFileSync(filePath, content, "utf8");

console.log(`✅ 새 포스트가 성공적으로 생성되었습니다!`);
console.log(`📁 카테고리: ${tag}`);
console.log(`📝 파일명: ${slug}.md`);
console.log(`👉 경로: ${filePath}`);
