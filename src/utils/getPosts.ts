import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Post {
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
  href: string;
}

/**
 * Parse frontmatter from markdown file content
 */
function parseFrontmatter(content: string): Record<string, string> {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const frontmatterString = match[1];
  const frontmatter: Record<string, string> = {};
  const lines = frontmatterString.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    frontmatter[key] = value;
  }

  return frontmatter;
}

/**
 * Get all posts from the content directory
 */
export function getAllPosts(): Post[] {
  // Get the project root (go up from src/utils to project root)
  const projectRoot = path.resolve(__dirname, '../..');
  const postsDir = path.join(projectRoot, 'src/content/posts');
  
  if (!fs.existsSync(postsDir)) {
    console.warn(`Posts directory not found: ${postsDir}`);
    return [];
  }

  const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.md'));
  const posts: Post[] = [];

  for (const file of files) {
    const filePath = path.join(postsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    try {
      const frontmatter = parseFrontmatter(content);
      
      // Use slug from frontmatter or generate from filename
      const slug = frontmatter.slug || path.basename(file, '.md');
      
      posts.push({
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        date: frontmatter.date || '',
        readTime: frontmatter.readTime || '5 min read',
        image: frontmatter.image || '/assets/images/posts/post1.jpg',
        slug: slug,
        href: `/posts/${slug}/`,
      });
    } catch (error) {
      console.error(`Error parsing ${file}:`, error);
    }
  }

  // Sort by date (newest first)
  posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return posts;
}
