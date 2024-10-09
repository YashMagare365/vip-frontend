import { DeleteOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CartItem = ({ product, handleQuantityChange, handleRemoveFromCart, quantity, cartItemId }) => {

  const [quantityState, setQuantity] = useState(quantity)
  console.log('from items=',cartItemId)
  return (
    <div className='border rounded-lg w-full'>
      <div className="flex items-center p-5 gap-8">
        <img src={product.images && product.images[0]} alt="" className="h-12 w-12" />
        <div className="">
          <p className="font-bold line-clamp-1">{product.name}</p>
          <p className=''>Color: {product.color} | Size: {product.size}</p>
          <p className='text-xl font-bold text-slate-800'>Rs. {product.price}</p>
        </div>
      </div>

      <div className="flex justify-between py-1 px-5 border-t w-full">
        <div className='flex items-center'>
          <p className='text-gray-600 mr-2'>Quantity:</p>
          <div className="flex rounded-md border">
            <button
              className="h-8 w-8 bg-orange-100"
              onClick={() => {
                if (quantityState > 1) {
                  setQuantity(quantityState - 1);
                  handleQuantityChange(product._id, quantityState - 1,cartItemId);
                }
              }}
            >
              -
            </button>
            <p className="w-12 flex justify-center items-center">{quantityState}</p>
            <button
              className="h-8 w-8 bg-orange-100"
              onClick={() => {
                setQuantity(quantityState + 1);
                handleQuantityChange(product._id, quantityState + 1,cartItemId);
              }}
            >
              +
            </button>
          </div>
        </div>

        <button className='text-red-500' onClick={() => handleRemoveFromCart(cartItemId)}><DeleteOutlined /></button>
      </div>
    </div>
  )
}

export default CartItem