import { useEffect, useState } from "react";
import { Tally3 } from "lucide-react";
import axios from "axios";
import { useFilter } from "../hooks/useFilter";
import BookCard from "./BookCard";

interface ProductResponse {
   name: string,
   price: number,
   rating: number,
   category: string,
   title: string,
   id: number,
   thumbnail: string
}
const MainComponent = () => {
   const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
      useFilter();

   const [products, setProducts] = useState<ProductResponse[]>([]);
   const [filter, setFIlter] = useState("all");
   const [currentPage, setCurrentPage] = useState(1);
   const [dropdownOpen, setDropdownOpen] = useState(false);
   const itemsPerPage = 12;
   useEffect(() => {
      let testUrl = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage
         } `;
      if (keyword) {
         testUrl = `https://dummyjson.com/products/search?q=${keyword}`;
      }
      axios
         .get(testUrl)
         .then((response) => {
            setProducts(response.data.products);
         })
         .catch((error) => {
            console.log("Error fetching data", error);
         });
   }, [currentPage, keyword]);

   const getFilteredProducts = () => {
      let filteredProducts = products;
      if (selectedCategory) {
         filteredProducts = filteredProducts?.filter(
            (product) => product.category == selectedCategory
         );
      }
      if (minPrice != undefined) {
         filteredProducts = filteredProducts.filter(
            (product) => product.price >= minPrice
         );
      }
      if (maxPrice != undefined) {
         filteredProducts = filteredProducts.filter(
            (product) => product.price <= maxPrice
         );
      }
      if (searchQuery) {
         filteredProducts = filteredProducts.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
         );
      }

      switch (filter) {
         case "expensive":
            return filteredProducts.sort((a, b) => b.price - a.price);
         case "cheap":
            return filteredProducts.sort((a, b) => a.price - b.price);
         case "popular":
            return filteredProducts.sort((a, b) => b.rating - a.rating);
         default:
            return filteredProducts;
      }
   };

   const filterProducts = getFilteredProducts();
   const totalProducts = 100;
   const totalPage = Math.ceil(totalProducts / itemsPerPage);

   const handlePageChange = (page: number) => {
      if (page > 0 && page < totalPage) {
         setCurrentPage(page);
      }
   };

   const getPaginationButtons = () => {
      const buttons: number[] = [];
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPage, currentPage + 2);
      if (currentPage - 2 < 1) {
         endPage = Math.min(totalPage, endPage + (2 - currentPage - 1))
      }
      if (currentPage + 2 > totalPage) {
         startPage = Math.min(1, startPage - (2 - totalPage - currentPage))
      }

      for (let page = startPage; page <= endPage; page++) {
         buttons.push(page)
      }
      return buttons
   }

   return (
      <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] p-5">
         <div className="mb-5">
            <div className="flex flex-col sm:flex-row justify-between items-center">
               <div className="relative mb-5 mt-5">
                  <button onClick={() => setDropdownOpen(!dropdownOpen)} className="border px-4 py-2 rounded-full items-center flex">
                     <Tally3 className="mr-2" />
                     {filter == "all"
                        ? "Filter"
                        : filter.charAt(0).toLowerCase() + filter.slice(1)}
                  </button>
                  {dropdownOpen && (
                     <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                        <button
                           onClick={() => setFIlter("cheap")}
                           className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                        >
                           Cheap
                        </button>
                        <button
                           onClick={() => setFIlter("expensive")}
                           className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                        >
                           Expensive
                        </button>
                        <button
                           onClick={() => setFIlter("popular")}
                           className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                        >
                           Popular
                        </button>
                     </div>
                  )}
               </div>
            </div>
            <div className="grid  sm:grid-cols-3 md:grid-cols-4 gap-5 w-full">
               {filterProducts.length ? filterProducts.map((product) => (
                  <BookCard
                     key={product.id}
                     id={product.id}
                     title={product.title}
                     image={product.thumbnail}
                     price={product.price}
                  />
               )) : (
                  <div className="h-[14rem] flex flex-col justify-center items-center border">
                     No data
                  </div>
               )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
               <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="border px-4 py-2 mx-2 rounded-full"
                  disabled={currentPage == 0}
               >
                  Previous
               </button>
               <div className="flex flex-wrap justify-center">
                  {getPaginationButtons().map((page) => (
                     <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page == currentPage ? "bg-black text-white" : ""}`}>{page}</button>
                  ))}
               </div>
               <button disabled={currentPage == totalPage} onClick={() => handlePageChange(currentPage + 1)} className="border px-4 py-2 mx-2 rounded-full">Next</button>
            </div>
         </div>
      </section>
   );
};

export default MainComponent;
