"use client";

import React from "react";
import { getLocalizedValues } from "@/hooks/general";
import { ProductCard } from "@/components/ProductCard";

export const Product = ({ products }: { products: any[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 py-10 mt-10">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products?.length > 0 &&
          products.map((product, index) => {
            product = getLocalizedValues(product);
            return <React.Fragment key={index}>
              <ProductCard product={product} index={index} />
            </React.Fragment>
          })}
      </div>
    </div>
  );
};

export default Product;
