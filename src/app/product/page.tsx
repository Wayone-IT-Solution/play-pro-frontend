"use client";

import { Fetch } from "@/utils/axios";
import { FiSearch } from "react-icons/fi";
import Product from "./components/Product";
import { LuListFilter } from "react-icons/lu";
import { useCallback, useEffect, useState } from "react";
import StadiumBrowser from "../../components/home/StadiumBrowser";

export default function Home() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response: any = await Fetch("/api/product/public", {
        page: 1,
        limit: 100000,
        searchkey: "name",
        search: search || undefined,
      }, 5000, true, false);

      if (response?.success)
        setProducts(response?.data?.result || []);
    } catch (error) {
      console.log("Products Error: ", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <div className="py-8 px-4 md:px-24 mt-20">
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
                value={search}
                placeholder="Search Product by name..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent pl-10 pr-3 py-4 outline-none text-[#932AAA] placeholder-[#932AAA] rounded-2xl"
              />
              <button
                onClick={fetchProducts}
                className="flex items-center gap-2 px-5 mr-2 py-2.5 bg-[#932AAA] text-white font-semibold text-sm h-fit rounded-full"
              >
                <LuListFilter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stadium Categories */}
      <StadiumBrowser />

      {/* Product Grid */}
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      ) : (
        <Product products={products} />
      )}
    </>
  );
}
