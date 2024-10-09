import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Collapse } from 'antd'

const OrderItem = ({ order, orderItem }) => {

  const [product, setProduct] = useState({})

  useEffect(() => {
    console.log(orderItem)
    setProduct(orderItem.product)
    // axios.get(`${import.meta.env.VITE_API_URL}/api/orderItem?orderItemId=${orderItemId}`, {
    //   headers: {
    //     token: Cookies.get('token'),
    //   }
    // })
    //   .then(res => {
    //     console.log(res.data.orderItem)
    //     axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${res.data.orderItem.productId}`)
    //     .then(res => {
    //       console.log(res.data.productData)
    //       setProduct(res.data.productData)
    //     })
    //   })
  }, [])

  const items = [
    {
      key: order._id,
      label: <div className='flex justify-between items-center'>
        <div className='flex gap-4'>
          <img src={product.images && product.images[0]} className='h-12 w-12 rounded object-contain' />
          <div>
            <h3 className='font-bold line-clamp-1'>{product.name}</h3>
            <h3 className='font-bold text-slate-800'>$ {product.price}</h3>
          </div>
        </div>
        <div className='flex gap-4'>
          <div>
            <p className="text-xs text-gray-600">Delivery</p>
            <p className='font-bold text-yellow-500'>{order.shippingStatus}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Expected</p>
            <p className='font-bold'>7 days</p>
          </div>
        </div>
      </div>,

      children:
        <div>
          <div className='flex flex-wrap items-center gap-5'>
            <div>
              <p className="text-xs text-gray-500">Color</p>
              <p className=''>{product.color}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Size</p>
              <p className=''>{'XL'}</p>
            </div>
          </div>
          <div className='mt-5 flex flex-wrap justify-between items-center gap-4'>
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className=''>{order._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Order Date</p>
              <p className=''>{order.orderDate.split('T')[0]}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Shipping Address</p>
              <p className=''>{order.shippingAddress}</p>
            </div>
          </div>
        </div>,
    },
  ]

  return (
    <Collapse items={items} bordered={false} defaultActiveKey={['1']} expandIconPosition='end' />
  )
}

export default OrderItem