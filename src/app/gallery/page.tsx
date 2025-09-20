"use client";
import Image from "next/image";
import { getLocalizedText } from "@/hooks/general";

export default function ResponsiveGallery() {
  const images: string[] = [
    "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc",
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-gray-800">
        {getLocalizedText(
          "Explore Our Premium Sports Grounds",
          "استكشف ملاعبنا الرياضية المميزة"
        )}
      </h1>
      {/* Responsive Grid */}
      <div className="flex flex-wrap gap-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-md cursor-pointer hover:scale-105 transition"
          >
            <Image
              width={500}
              height={500}
              alt={`Ground ${index + 1}`}
              className="w-full h-64 object-cover"
              src={`${img}?auto=format&fit=crop&w=600&q=80`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
