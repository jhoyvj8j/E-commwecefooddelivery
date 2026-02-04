import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { setMyShopData } from '../redux/ownerSlice';
import { ClipLoader } from 'react-spinners';

function AddItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myShopData } = useSelector(state => state.owner)

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const [category, setCategory] = useState("")
  const [foodType, setFoodType] = useState("veg")

  const categories = [
    "Snacks","Main Course","Desserts","Pizza","Burgers",
    "Sandwiches","South Indian","North Indian","Chinese",
    "Fast Food","Others"
  ]

  const handleImage = (e) => {
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("category", category)
      formData.append("foodType", foodType)
      formData.append("price", Number(price))
      if (backendImage) {
        formData.append("image", backendImage)
      }

      const result = await axios.post(
        `${serverUrl}/api/item/add-item`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      dispatch(setMyShopData(result.data))
      navigate("/")
    } catch (error) {
      console.log("Add item error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center flex-col items-center p-6 min-h-screen">
      <div className="absolute top-5 left-5" onClick={() => navigate("/")}>
        <IoIosArrowRoundBack size={35} />
      </div>

      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow">
        <div className="flex flex-col items-center mb-6">
          <FaUtensils size={50} />
          <h2 className="text-2xl font-bold mt-2">Add Food</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input type="file" accept="image/*" onChange={handleImage} />

          {frontendImage && (
            <img src={frontendImage} alt="" className="h-40 w-full object-cover" />
          )}

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <select value={foodType} onChange={(e) => setFoodType(e.target.value)}>
            <option value="veg">Veg</option>
            <option value="non veg">Non Veg</option>
          </select>

          <button disabled={loading}>
            {loading ? <ClipLoader size={18} /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddItem
