"use client";
import Image from "next/image";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

const products = [
  {
    id: 1,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/shoes.png",
  },
  {
    id: 2,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/shoes2.png",
  },
  {
    id: 3,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product.png",
  },
  {
    id: 4,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product1.png",
  },
  {
    id: 5,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product2.png",
  },
  {
    id: 6,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product3.png",
  },
  {
    id: 7,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product4.png",
  },
  {
    id: 8,
    brand: "Nike",
    name: "Shoes",
    rating: "4.5",
    description: "Nike shoes provide best comfort and confidence",
    price: "300 AED",
    image: "/assets/product2.png",
  },
];

const ProductsForYou = () => {
  return (
    <div className="w-screen md:max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Products For You
          </h2>
          <p className="text-gray-600 text-lg">Exclusive showcase of Fields</p>
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
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-white flex flex-col"
          >
            {/* Product Image */}
            <div className="relative h-56 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {/* Nike Tag */}
              <div
                className="absolute top-3 right-3 bg-white text-gray-800 px-2 py-1 rounded-full shadow-sm"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "12px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {product.brand}
              </div>
            </div>
            {/* Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </span>
                  <span className="flex items-center text-xs text-gray-700 gap-1">
                    <span className="mr-1">⭐</span>
                    {product.rating} Rating
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">
                  {product.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-base font-medium text-gray-900">
                  {product.price}
                </span>
                <button
                  className="px-4 py-2 text-white font-medium rounded-lg text-sm"
                  style={{ background: "#6D0E82" }}
                >
                  Add To Cart
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
