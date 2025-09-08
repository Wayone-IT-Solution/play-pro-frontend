"use client";

import React from "react";
import { ProductCard } from "../ProductCard";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { getLocalizedValues, getLocalizedText } from "@/hooks/general";

const ProductsForYou = ({ products }: { products: any[] }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            {getLocalizedText("Best Selling Products", "أفضل المنتجات مبيعاً")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            {getLocalizedText(
              "Exclusive showcase of products curated just for you.",
              "عرض حصري للمنتجات المختارة خصيصاً لك."
            )}
          </p>
        </div>

        <button
          className="w-[45px] h-[35px] flex items-center justify-center bg-white shadow-sm rounded-lg"
          style={{
            borderWidth: "1px",
            borderStyle: "dashed",
            borderColor: "#6D0E82",
          }}
        >
          <LiaLongArrowAltRightSolid size={18} color="#6D0E82" />
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 &&
          products.map((product, index) => {
            product = getLocalizedValues(product);
            return (
              <React.Fragment key={index}>
                <ProductCard product={product} index={index} />
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default ProductsForYou;
