import React from 'react'
import { Link } from 'react-router-dom'


interface IBookCardProps {
   id: number,
   title: string,
   image: string,
   price: number,
}
const BookCard: React.FC<IBookCardProps> = ({ id, image, title, price }) => {
   return (
      <div className='border p-4 rounded '>
         <Link to={`/product/${id}`} className='flex flex-col justify-between h-[15rem]'>
            <img src={image} alt={title} className='w-full h-35 object-cover mb-2' />
            <h2 className='font-bold truncate'>{title}</h2>
            <p className='text-gray-500'><span className='font-bold text-gray-600'>price:</span> $ {price}</p>
         </Link>
      </div>
   )
}

export default BookCard