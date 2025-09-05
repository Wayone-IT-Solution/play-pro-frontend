"use client";
import { Post, Put } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const ProductsForYou = ({ products }: { products: any[] }) => {
  const router = useRouter();

  const handleAddToCart = async (item: any) => {
    try {
      const response: any = await Put(
        "/api/cart",
        {
          productId: item._id,
          quantity: 1,
        },
        5000,
        true
      );
      if (response?.success) {
        router.push("/cart");
      }
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
            Best selling Product
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Exclusive showcase of Fields
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
          products.map((product) => (
            <div
              key={product._id}
              className="rounded-2xl overflow-hidden shadow-md bg-white flex flex-col transition hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="relative h-52 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.brand && (
                  <div
                    className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 rounded-full shadow-sm text-xs italic"
                    style={{ fontFamily: "Poppins" }}
                  >
                    {product.brand}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-base md:text-lg text-gray-800 line-clamp-1">
                    {product.name}
                  </span>
                  {product.rating && (
                    <span className="flex items-center text-xs text-gray-700 gap-1">
                      ⭐ {product.rating}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <span className="text-base font-medium text-gray-900">
                    SAR {product.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="px-3 py-1.5 text-sm rounded-full"
                    style={{
                      background: "#6D0E82",
                      color: "#fff",
                      fontWeight: 600,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductsForYou;
