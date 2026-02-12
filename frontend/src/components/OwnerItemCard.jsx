import axios from 'axios';
import React from 'react'
import { FaPen, FaTrashAlt, FaStar, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setMyShopData } from '../redux/ownerSlice';

function OwnerItemCard({ data }) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (!data) return null;

  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/delete/${data._id}`,
        { withCredentials: true }
      )
      dispatch(setMyShopData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='group relative bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden w-full max-w-sm'>

      {/* Best Seller Ribbon */}
      <div className='absolute top-4 -left-8 rotate-[-45deg] bg-yellow-400 text-xs font-bold px-10 py-1 text-white shadow z-10'>
        BEST SELLER
      </div>

      {/* Image */}
      <div className='relative h-52 overflow-hidden'>
        <img
          src={data.image || "/placeholder.jpg"}
          alt={data.name}
          className='w-full h-full object-cover group-hover:scale-110 transition duration-500'
        />

        {/* Price */}
        <div className='absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#ff4d2d] shadow'>
          ₹{data.price}
        </div>

        {/* Like Icon */}
        <div className='absolute bottom-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer hover:text-red-500 transition'>
          <FaHeart size={14} />
        </div>
      </div>

      {/* Content */}
      <div className='p-4'>

        <div className='flex justify-between items-center'>
          <h2 className='text-lg font-bold text-gray-800'>
            {data.name}
          </h2>

          <div className='flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs'>
            <FaStar size={10} />
            4.3
          </div>
        </div>

        <p className='text-sm text-gray-500 mt-1'>
          {data.category} • {data.foodType}
        </p>

        {/* Status */}
        <div className='mt-2'>
          <span className='text-xs px-2 py-1 rounded-full bg-green-100 text-green-600'>
            Active
          </span>
        </div>

        {/* Buttons */}
        <div className='flex justify-between items-center mt-4'>

          <button
            onClick={() => navigate(`/edit-item/${data._id}`)}
            className='flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 transition'
          >
            <FaPen size={14} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className='flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-100 transition'
          >
            <FaTrashAlt size={14} />
            Delete
          </button>

        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard
