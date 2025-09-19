"use client";

import "swiper/css";
import { useRef } from "react";
import AdvancedBlogCard from "./BlogCard";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionHeading from "@/components/common/SectionHeading";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";

interface Blog {
  _id: any;
  name: string;
  slug?: string;
  author: string;
  content: string;
  imageUrl: string;
  description: string;
  categoryName?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  blogCategoryId?: number | string;
  status?: "active" | "draft" | string | null;
}

const BlogSwiper = ({ blogs }: { blogs: Blog[] }) => {
  const swiperRef = useRef<SwiperType>(null);
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 bg-white">
      <div>
        <SectionHeading
          title={getLocalizedText("Our Latest", "أحدث مقالاتنا")}
          highlight={getLocalizedText("Blogs", "المدونات")}
          subtitle={getLocalizedText(
            "Discover expert insights, tips, and updates on football grounds, booking processes, and how to make the most of your playtime.",
            "اكتشف رؤى ونصائح وتحديثات متخصصة حول ملاعب كرة القدم، وعمليات الحجز، وكيفية الاستفادة القصوى من وقت لعبك."
          )}
        />
        <div className="relative mb-5">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              0: {
                slidesPerView: 1.25,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2.5,
              },
              1024: {
                slidesPerView: 3.5,
              },
              1284: {
                slidesPerView: 4,
              },
            }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="mySwiper"
          >
            {blogs.map((blog) => {
              blog = getLocalizedValues(blog);
              return <SwiperSlide key={blog._id}>
                <AdvancedBlogCard blog={blog} hrefBase={"/blogs"} />
              </SwiperSlide>
            })}
          </Swiper>

          {/* Navigation buttons */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-gray-100 md:bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-gray-100 md:bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogSwiper;
