"use client";

import React from "react";
import AdvancedBlogCard from "@/components/common/BlogCard";
import SectionHeading from "@/components/common/SectionHeading";
import { getLocalizedText, getLocalizedValues } from "@/hooks/general";

const BlogPageDiv = ({ blogs }: { blogs: any }) => {
  return (
    <div className="py-4 md:py-8 lg:py-12">
      <SectionHeading
        title={getLocalizedText("Our Latest", "أحدث مقالاتنا")}
        highlight={getLocalizedText("Blogs", "المدونات")}
        subtitle={getLocalizedText(
          "Discover expert insights, tips, and updates on football grounds, booking processes, and how to make the most of your playtime.",
          "اكتشف رؤى ونصائح وتحديثات متخصصة حول ملاعب كرة القدم، وعمليات الحجز، وكيفية الاستفادة القصوى من وقت لعبك."
        )}
      />
      <div className="max-w-9xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blogs?.length > 0 &&
          blogs.map((blog: any, index: any) => {
            blog = getLocalizedValues(blog);
            return (
              <React.Fragment key={index}>
                <AdvancedBlogCard blog={blog} hrefBase={"/blogs"} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default BlogPageDiv;
