import { FeaturedBlogsClient } from "@/components/sections/FeaturedBlogsClient";
import { getBaseUrl } from "@/lib/site";

type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  featuredImage?: string | null;
  featuredImageUrl?: string | null;
  publishedAt?: string | null;
};

async function getFeaturedBlogs(): Promise<Blog[]> {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/blogs?limit=4`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data.blogs) ? data.blogs : [];
}

export async function FeaturedBlogs() {
  const blogs = await getFeaturedBlogs();
  return <FeaturedBlogsClient blogs={blogs} />;
}
