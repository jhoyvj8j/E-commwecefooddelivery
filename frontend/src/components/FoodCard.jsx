import React, { useState } from 'react'
import { FaLeaf, FaDrumstickBite, FaStar, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/userSlice'

function FoodCard({ data }) {

  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()
  const { cartItems } = useSelector(state => state.user)

  if (!data) return null

  const isInCart = cartItems.some(i => i.id === data._id)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) =>
      i < Math.round(rating)
        ? <FaStar key={i} className="text-yellow-500 text-sm" />
        : <FaRegStar key={i} className="text-yellow-400 text-sm" />
    )
  }

  return (
    <div className='group relative w-[320px] bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col'>

      {/* Image Section */}
      <div className='relative h-64 overflow-hidden'>
        <img
          src={data.image || "/placeholder.jpg"}
          alt={data.name}
          className='w-full h-full object-cover group-hover:scale-110 transition duration-500'
        />

        {/* Top Left Tags */}
        <div className='absolute top-3 left-3 flex flex-col gap-2'>

          {/* Veg/Non-Veg Badge */}
          <div className='bg-white px-3 py-1 rounded-full shadow text-xs font-medium flex items-center gap-1'>
            {data.foodType === "veg"
              ? <>
                  <FaLeaf className='text-green-600' />
                  <span className='text-green-600'>Veg</span>
                </>
              : <>
                  <FaDrumstickBite className='text-red-600' />
                  <span className='text-red-600'>Non-Veg</span>
                </>
            }
          </div>

          {/* Best Seller - Only if true */}
          {data.isBestSeller && (
            <div className='bg-[#ff4d2d] text-white text-xs px-3 py-1 rounded-full shadow font-semibold'>
              BEST SELLER
            </div>
          )}

        </div>

        {/* Rating */}
        <div className='absolute bottom-3 left-3 bg-green-600 text-white text-sm px-2 py-1 rounded flex items-center gap-1 shadow'>
          <FaStar size={12} />
          {data.rating?.average || 4.2}
        </div>

        {/* Price */}
        <div className='absolute top-3 right-3 bg-white px-4 py-1 rounded-full text-base font-bold text-[#ff4d2d] shadow'>
          ₹{data.price}
        </div>
      </div>

      {/* Content */}
      <div className='p-5 flex-1 flex flex-col justify-between'>

        <div>
          <h2 className='font-bold text-gray-800 text-xl truncate'>
            {data.name}
          </h2>

          <div className='flex items-center gap-1 mt-2'>
            {renderStars(data.rating?.average || 0)}
            <span className='text-sm text-gray-500'>
              ({data.rating?.count || 0})
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-5 flex items-center justify-between'>

          {/* Quantity */}
          <div className='flex items-center bg-gray-100 rounded-full px-4 py-2 gap-4 shadow-sm'>
            <button
              onClick={() => quantity > 0 && setQuantity(quantity - 1)}
              className='text-gray-600 hover:text-black'
            >
              <FaMinus size={14} />
            </button>

            <span className='text-base font-semibold'>
              {quantity}
            </span>

            <button
              onClick={() => setQuantity(quantity + 1)}
              className='text-gray-600 hover:text-black'
            >
              <FaPlus size={14} />
            </button>
          </div>

          {/* Add Button */}
          <button
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-md
              ${isInCart
                ? "bg-gray-900 text-white"
                : "bg-[#ff4d2d] text-white hover:bg-red-600 hover:scale-105"}`}
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
            {isInCart ? "Added" : "Add"}
          </button>

        </div>

      </div>
    </div>
  )
}

export default FoodCard
