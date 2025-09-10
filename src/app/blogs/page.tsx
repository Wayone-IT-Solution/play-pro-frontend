import { Fetch } from "@/utils/Server";
import BlogPageDiv from "./components/BlogPageDiv";
import BannerSwiper from "@/components/common/Banner";

const fetchBlogPageData = async (): Promise<any> => {
  try {
    const [bannerRes, blogRes] = await Promise.all([
      Fetch("/api/banner/public"),
      Fetch("/api/blog/public"),
    ]);

    const blogs = blogRes?.data?.result ?? [];
    const banners = bannerRes?.data?.result ?? [];

    return {
      blogs,
      banners,
      loading: true,
    };
  } catch (error) {
    console.log("Error fetching page data:", error);
    return { loading: false };
  }
};

export default async function Page() {
  const { blogs, banners } = await fetchBlogPageData();
  return (
    <div className="overflow-hidden">
      <BannerSwiper banners={banners} />
      {blogs?.length > 0 &&
        <BlogPageDiv blogs={blogs} />
      }
    </div>
  );
}
