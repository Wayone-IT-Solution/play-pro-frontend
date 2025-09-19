"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import {
  FiTag,
  FiUser,
  FiClock,
  FiShare2,
  FiArrowUpRight,
} from "react-icons/fi";
import { getLocalizedText } from "@/hooks/general";

type Props = {
  blog: any;
  hrefBase?: string;
  className?: string;
  variant?: "default" | "compact" | "featured";
};

function stripHtml(html: string): string {
  if (!html) return "";
  // Remove tags & decode minimal entities
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  return text.replace(/\s+/g, " ").trim();
}

function wordsCount(text: string) {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeFromHtml(html: string, wpm = 200) {
  const text = stripHtml(html);
  const mins = Math.max(1, Math.round(wordsCount(text) / wpm));
  return mins;
}

function formatDate(input?: string | Date) {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function AdvancedBlogCard({
  blog,
  className = "",
  hrefBase = "/blog",
  variant = "default",
}: Props) {
  const title = blog?.title?.replace(/^\"|\"$/g, "").trim() || "Untitled";
  const cleanText = useMemo(
    () => stripHtml(blog?.short_description || ""),
    [blog?.content, blog?.description]
  );
  const excerpt = useMemo(
    () => cleanText.slice(0, 180) + (cleanText.length > 180 ? "…" : ""),
    [cleanText]
  );
  const minutes = useMemo(
    () => readingTimeFromHtml(blog?.description || ""),
    [blog?.content, blog?.description]
  );
  const date = formatDate(blog?.createdAt || blog?.updatedAt);
  const status = (blog?.status || "").toString().toLowerCase();
  const category =
    blog?.categoryName ||
    (blog?.blogCategoryId ? `Category #${blog?.blogCategoryId}` : undefined);
  const href = blog?.slug
    ? `${hrefBase}/${blog?.slug}`
    : `${hrefBase}/${blog?.id}`;

  const onShare = async () => {
    try {
      const shareData = {
        title,
        text: excerpt,
        url:
          typeof window !== "undefined" ? window.location.origin + href : href,
      };
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const containerVariants = {
    initial: { y: 0, opacity: 0.95 },
    hover: { y: -6, opacity: 1 },
    tap: { scale: 0.98 },
  } as const;

  return (
    <motion.article
      variants={containerVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      className={[
        "group relative mt-2 overflow-hidden rounded-2xl border shadow-sm transition-shadow cursor-pointer border-zinc-800 bg-zinc-900",
        variant === "featured" && "md:col-span-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Media */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          fill
          alt={title}
          src={blog?.imageUrl}
          priority={variant === "featured"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
        {/* Top-left badges */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          {category && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-900 shadow backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-100">
              <FiTag className="h-3.5 w-3.5" /> {category}
            </span>
          )}
          {status && (
            <span
              className={[
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold shadow backdrop-blur",
                status === "active"
                  ? "bg-emerald-500/90 text-white"
                  : "bg-amber-500/90 text-white",
              ].join(" ")}
            >
              {status === "active"
                ? "Published"
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            <Link
              href={href}
              className="inline-flex items-start hover:underline"
            >
              <span className="line-clamp-2">{title}</span>
            </Link>
          </h3>
          <div className="flex shrink-0 items-center text-white gap-2">
            <button
              aria-label="Share"
              onClick={onShare}
              className="rounded-full border border-zinc-200 p-2 transition hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              <FiShare2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="line-clamp-2 md:line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {excerpt}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <FiUser className="h-4 w-4" /> {blog?.author}
          </span>
          {date && (
            <>
              <span>•</span>
              <time
                dateTime={
                  typeof blog?.createdAt === "string"
                    ? blog?.createdAt
                    : undefined
                }
              >
                {date}
              </time>
            </>
          )}
          <span>•</span>
          <span className="inline-flex items-center gap-1.5">
            <FiClock className="h-4 w-4" /> {minutes} min read
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <Link
            href={href}
            className="group/cta inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 transition hover:gap-1.5 hover:text-zinc-700 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            {getLocalizedText("Read more", "اقرأ المزيد")}
            <FiArrowUpRight className="h-4 w-4 transition group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
