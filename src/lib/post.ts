import path from "path";
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from "remark";
import remarkHtml from "remark-html";

// posts 폴더 경로
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: any = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data as { date: string; title: string; }
    }
  });

  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
};

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map(fileName => {
    return {
      params: { id: fileName.replace(/\.md$/, '') }
    }
  });
};

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(remarkHtml).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data as { date: string; title: string; }
  }
};