import StadiumBrowser from "../../components/home/StadiumBrowser";
import { Fetch } from "@/utils/Server";
import Product from "./components/Product";
import {  FiSearch } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";

export default async function Home() {
  const productResponse = await Fetch("/api/product/public");
  const products = productResponse?.data?.result ?? [];

  return (
    <div className="py-8 px-4 md:px-24 bg-white min-h-screen mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h2 className="font-bold text-2xl md:text-3xl text-gray-900">
            Best selling Product
          </h2>
          <p className="text-gray-500 mt-1">Exclusive showcase of Fields</p>
        </div>

        <div className="flex lg:w-1/2 items-center md:w-auto">
          <div className="flex-1 relative flex items-center rounded-full bg-[#932AAA26] w-full overflow-hidden">
            <FiSearch className="absolute left-3 text-[#932AAA] h-5 w-5" />

            <input
              type="text"
              placeholder="Search Product"
              className="w-full bg-transparent pl-10 pr-3 py-4 outline-none text-[#932AAA] placeholder-[#932AAA] rounded-2xl"
            />
            <button className="flex items-center gap-2 px-5 mr-2 py-2.5 bg-[#932AAA] text-white font-semibold text-sm h-fit rounded-full">
              <LuListFilter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Stadium Categories */}
      <StadiumBrowser />

      {/* Product Grid */}
      <Product products={products} />
    </div>
  );
}
