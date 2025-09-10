"use client";

import Image from "next/image";
import { MdAccessTime } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { getLocalizedValues } from "@/hooks/general";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const BlogDetailPage = ({ blogData }: any) => {
  blogData = getLocalizedValues(blogData);
  const [estimatedReadTime] = useState(5);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 pt-32 md:pt-24 lg:pt-28">
        {/* Article Header */}
        <article className="bg-white rounded-3xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative bg-gradient-to-r rounded-3xl from-green-400 to-emerald-500 overflow-hidden">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <AiOutlineLoading3Quarters className="text-white rounded-3xl text-3xl animate-spin" />
              </div>
            )}
            <Image
              width={500}
              height={500}
              unoptimized
              alt={blogData?.title}
              src={`${blogData?.imageUrl}`}
              onLoad={() => setIsImageLoaded(true)}
              className={`w-full rounded-3xl overflow-hidden h-full object-cover transition-opacity duration-300 ${isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t rounded-3xl from-black/50 via-transparent to-transparent" />
          </div>

          {/* Article Content */}
          <div className="py-6 md:py-8">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              {blogData?.title.replace(/"/g, "")}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-green-500" />
                <span>{formatDate(blogData?.createdAt)}</span>
              </div>

              <div className="flex items-center">
                <MdAccessTime className="mr-2 text-green-500" />
                <span>{estimatedReadTime} min read</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-400">•</span>
                <span className="ml-2 text-xs text-gray-500">
                  {getTimeAgo(blogData?.createdAt)}
                </span>
              </div>
            </div>

            {/* Article Description */}
            <div className="mb-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500">
              <p className="text-gray-700 leading-relaxed text-xs md:text-lg italic">
                {blogData?.short_description}
              </p>
            </div>

            <div
              className="prose space-y-2"
              dangerouslySetInnerHTML={{ __html: blogData?.description }}
            />
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogDetailPage;
