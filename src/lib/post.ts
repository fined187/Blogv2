import path from "path";
import fs from 'fs';
import matter from 'gray-matter';

// posts 폴더 경로
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPorstData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData: any = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    const matterResult = matter(fileContents);

    return {
      id,
      ...allPostsData(matterResult.data as { date: string; title: string; })
    }
  })
  return allPostsData.sort((a: any, b: any) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  });
}