import { Fetch } from "@/utils/Server";
import BlogDetailPage from "../components/BlogDetail";

export default async function Page(ctx: any) {
  const { slug } = await ctx.params;
  const blogResponse = await Fetch("/api/blog/public/" + slug);
  const blog = blogResponse?.data;
  return <BlogDetailPage blogData={blog} />;
}
