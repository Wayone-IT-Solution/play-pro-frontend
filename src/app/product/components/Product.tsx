import { ProductCard } from "@/components/ProductCard";

export const Product = ({ products }: { products: any[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 py-10 mt-10">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products?.length > 0 &&
          products.map((product, index) => (
            <ProductCard product={product} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Product;
