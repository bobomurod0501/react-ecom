// import axios from "axios";
import { useEffect, useState } from "react";

interface Authors {
   name: string,
   image: string,
   isFollowing: boolean,
}

const TopSellers = () => {
   const [authours, setAuthours] = useState<Authors[] | []>([]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch("https://randomuser.me/api/?results=5");
            const data = await response.json();a
            console.log("data", data)
            const authorsData = data.results.map((user: { name: { first: string; last: string; }; picture: { medium: string; }; }) => ({
               name: `${user.name.first} ${user.name.last}`,
               isFollowing: false,
               image: user.picture.medium,
            }));
            setAuthours(authorsData);
         } catch (error) {
            console.log(error);
         }
      };
      fetchData();
   }, []);
   const handleFollowClick = (index: number) => {
      setAuthours(prevAuthor => prevAuthor?.map((author, i: number) => i == index ? { ...author, isFollowing: !author.isFollowing } : author))
   }

   return (
      <div className="bg-white p-5 mx-5 mt-[5rem] border w-[23rem] rounded">
         <h2 className="text-xl font-bold mb-5">Top Sellers</h2>

         <ul>
            {authours?.map((author, index: number) => (
               <li key={index} className="flex items-center justify-between mb-4">
                  <section className="flex justify-center items-center">
                     <img
                        src={author.image}
                        alt={author.name}
                        className="w-[25%] h-[25%] rounded-full justify-center "
                     />
                     <span className="ml-4">{author.name}</span>
                  </section>
                  <button
                     onClick={() => handleFollowClick(index)}
                     className={`py-1 px-3 rounded ${author.isFollowing
                           ? "bg-red-500 text-white"
                           : "bg-black text-white"
                        }`}
                  >
                     {author.isFollowing ? "Unfollow" : "Follow"}
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default TopSellers;
