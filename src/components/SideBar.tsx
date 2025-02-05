import React, { useEffect, useState } from "react";
import { useFilter } from "../hooks/useFilter";
// import { useNavigate } from "react-router-dom";

// interface Products {
//   category: string;
// }
// interface FetchResponse {
//   products: Products[];
// }
const SideBar = () => {
   const [categories, setCategories] = useState<string[]>([]);
   const [keywords] = useState<string[]>([
      "apple",
      "watch",
      "shoes",
      "fashions",
      "shirt",
      "trend",
   ]);
   // const navigate = useNavigate()
   const {
      searchQuery,
      setSearchQuery,
      minPrice,
      setMinPrice,
      maxPrice,
      setMaxPrice,
      selectedCategory,
      setSelectedCategory,
      setKeyword,
      // keyword
   } = useFilter();

   useEffect(() => {
      const fetchCategories = async () => {
         try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            const uniqueCategory: string[] = Array.from(
               new Set(data.products.map((product: { category: string }) => product.category))
            );
            setCategories(uniqueCategory);
         } catch (error) {
            console.log(error);
         }
      };
      fetchCategories();
   }, []);
   const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMinPrice(value ? parseFloat(value) : undefined)
   }
   const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setMaxPrice(value ? parseFloat(value) : undefined)
   }
   const handleRadioChangeCategorise = (category: string) => {
      setSelectedCategory(category)
   }
   const handleKeywordClick = (keyword: string) => {
      setKeyword(keyword)
   }
   const handleResetFilters = () => {
      setSelectedCategory("")
      setKeyword("")
      setMaxPrice(undefined)
      setMinPrice(undefined)
      setSearchQuery("")
   }
   return (
      <div className="w-64 p-5 h-screen fixed left-3">
         <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
         <section>
            <input
               type="text"
               placeholder="Search category"
               className="border-2 py-1 rounded px-2 sm:mb-0 w-[100%]"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex justify-between items-center mt-3">
               <input
                  type="text"
                  className="border-2 mr-2 px-5 py-1 mb-3 w-full"
                  placeholder="Min"
                  value={minPrice ?? ""}
                  onChange={(e) => handleMinPriceChange(e)}
               />
               <input
                  type="text"
                  className="border-2  px-5 py-1 mb-3 w-full"
                  placeholder="Max"
                  value={maxPrice ?? ""}
                  onChange={(e) => handleMaxPriceChange(e)}
               />
            </div>
            <div className="mb-5">
               <h2 className="text-xl font-semibold mb-3">Categories</h2>
            </div>
            <section>
               {categories.map((category: string, index: number) => (
                  <label key={index} className="block mb-2">
                     <input
                        type="radio"
                        name="category"
                        value={category}
                        className="mr-2 w-[16px] h-[16px]"
                        onChange={() => handleRadioChangeCategorise(category)}
                        checked={selectedCategory == category}
                     />
                     {category.toUpperCase()}
                  </label>
               ))}
            </section>
            <div className="mb-5 mt-4">
               <h2 className="text-xl font-semibold mb-3"> Keywords</h2>
               <div>
                  {keywords.map((keyword, index) => (
                     <button
                        key={index}
                        className="block mb-2 px-4 py-2 w-full text-left rounded border hover:bg-gray-200"
                        onClick={() => handleKeywordClick(keyword)}
                     >
                        {keyword.toUpperCase()}
                     </button>
                  ))}
               </div>
            </div>
            <button onClick={handleResetFilters} className="w-full bg-black text-white mb-[4rem] py-2 rounded mt-5">
               {" "}
               Reset filters
            </button>
         </section>
      </div>
   );
};

export default SideBar;
