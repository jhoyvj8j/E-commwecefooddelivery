import React, { useState } from 'react'
import { FaLeaf, FaDrumstickBite, FaStar, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/userSlice'

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.user)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-500 text-lg" />
      ) : (
        <FaRegStar key={i} className="text-yellow-500 text-lg" />
      )
    )
  }

  return (
    <div className='w-[250px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col'>
      <div className='relative w-full h-[170px] bg-white'>
        <div className='absolute top-3 right-3 bg-white rounded-full p-1 shadow'>
          {data.foodType === "veg"
            ? <FaLeaf className='text-green-600' />
            : <FaDrumstickBite className='text-red-600' />
          }
        </div>
        <img src={data.image} alt={data.name} className='w-full h-full object-cover' />
      </div>

      <div className="p-4">
        <h1 className='font-semibold truncate'>{data.name}</h1>
        <div className='flex items-center gap-1'>
          {renderStars(data.rating?.average || 0)}
          <span className='text-xs text-gray-500'>
            {data.rating?.count || 0}
          </span>
        </div>
      </div>

      <div className='flex items-center justify-between p-3'>
        <span className='font-bold'>₹{data.price}</span>

        <div className='flex items-center border rounded-full overflow-hidden'>
          <button onClick={() => quantity > 0 && setQuantity(quantity - 1)}>
            <FaMinus size={12} />
          </button>

          <span className='px-2'>{quantity}</span>

          <button onClick={() => setQuantity(quantity + 1)}>
            <FaPlus size={12} />
          </button>

          <button
            className={`px-3 py-2 text-white ${cartItems.some(i => i.id === data._id)
              ? "bg-gray-800"
              : "bg-[#ff4d2d]"}`}
            onClick={() => {
              if (quantity > 0) {
                dispatch(addToCart({
                  id: data._id,
                  name: data.name,
                  price: data.price,
                  image: data.image,
                  shop: data.shop,
                  quantity,
                  foodType: data.foodType
                }))
              }
            }}
          >
            <FaShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodCard
