import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdPhone } from "react-icons/md"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { updateOrderStatus } from '../redux/userSlice'

function OwnerOrderCard({ data }) {
  const [availableBoys, setAvailableBoys] = useState([])
  const dispatch = useDispatch()

  const handleUpdateStatus = async (orderId, shopId, status) => {
    if (!status) return
    try {
      const result = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      )
      dispatch(updateOrderStatus({ orderId, shopId, status }))
      setAvailableBoys(result.data?.availableBoys || [])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow p-4 space-y-4'>
      
      {/* USER INFO */}
      <div>
        <h2 className='text-lg font-semibold text-gray-800'>
          {data?.user?.fullName || "User"}
        </h2>
        <p className='text-sm text-gray-500'>{data?.user?.email}</p>
        <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
          <MdPhone />
          <span>{data?.user?.mobile}</span>
        </p>

        {data?.paymentMethod === "online"
          ? <p className='text-sm text-gray-600'>Payment: {data?.payment ? "Paid" : "Pending"}</p>
          : <p className='text-sm text-gray-600'>Payment Method: {data?.paymentMethod}</p>
        }
      </div>

      {/* ADDRESS */}
      <div className='flex flex-col gap-1 text-gray-600 text-sm'>
        <p>{data?.deliveryAddress?.text}</p>
        <p className='text-xs text-gray-500'>
          Lat: {data?.deliveryAddress?.latitude || 0},
          Lon: {data?.deliveryAddress?.longitude || 0}
        </p>
      </div>

      {/* ITEMS */}
      <div className='flex space-x-4 overflow-x-auto pb-2'>
        {data?.shopOrders?.shopOrderItems
          ?.filter(i => i?.item)   // 🔥 NULL ITEMS REMOVE
          ?.map((item, index) => (
            <div key={index} className='flex-shrink-0 w-40 border rounded-lg p-2 bg-white'>
              <img
                src={item?.item?.image || "/no-image.png"}
                alt=""
                className='w-full h-24 object-cover rounded'
              />
              <p className='text-sm font-semibold mt-1'>
                {item?.item?.name || "Item"}
              </p>
              <p className='text-xs text-gray-500'>
                Qty: {item?.quantity} × ₹{item?.price}
              </p>
            </div>
          ))}
      </div>

      {/* STATUS */}
      <div className='flex justify-between items-center pt-3 border-t'>
        <span className='text-sm'>
          Status:
          <span className='ml-1 font-semibold capitalize text-[#ff4d2d]'>
            {data?.shopOrders?.status}
          </span>
        </span>

        <select
          className='rounded-md border px-3 py-1 text-sm border-[#ff4d2d] text-[#ff4d2d]'
          onChange={(e) =>
            handleUpdateStatus(
              data?._id,
              data?.shopOrders?.shop?._id,
              e.target.value
            )
          }
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out Of Delivery</option>
        </select>
      </div>

      {/* DELIVERY BOY */}
      {data?.shopOrders?.status === "out of delivery" && (
        <div className="mt-3 p-2 border rounded-lg text-sm bg-orange-50">
          {data?.shopOrders?.assignedDeliveryBoy
            ? <p>Assigned Delivery Boy:</p>
            : <p>Available Delivery Boys:</p>
          }

          {availableBoys?.length > 0
            ? availableBoys.map((b, i) => (
                <div key={i}>{b?.fullName} - {b?.mobile}</div>
              ))
            : data?.shopOrders?.assignedDeliveryBoy
              ? <div>{data.shopOrders.assignedDeliveryBoy.fullName} - {data.shopOrders.assignedDeliveryBoy.mobile}</div>
              : <div>Waiting for delivery boy to accept</div>
          }
        </div>
      )}

      {/* TOTAL */}
      <div className='text-right font-bold text-gray-800 text-sm'>
        Total: ₹{data?.shopOrders?.subtotal || 0}
      </div>
    </div>
  )
}

export default OwnerOrderCard
