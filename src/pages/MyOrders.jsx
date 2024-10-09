import React, { useState, useEffect }  from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import OrderItem from '../components/my-orders/OrderItem';

const MyOrders = () => {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/order`, {
        headers: { token }
      })
        .then(res => {
          console.log(res.data.order)
          setOrders(res.data.order)
        });
    }
  }, []);

  return (
    <div className='max-md:px-5 w-full lg:w-max mx-auto'>
      <h1 className="my-10 text-3xl font-bold italic">My Orders</h1>

      {orders.length === 0 ? <h1 className="text-2xl font-bold italic text-center">No Orders Yet</h1> :
        <div className='w-full max-w-[600px] lg:w-[600px] flex flex-col gap-5'>
          {orders.map(order => (
            order.orderItems.map((orderItem, index) => (
              <OrderItem key={order._id + index} orderItem={orderItem} order={order} />
            ))
          ))}
          {/* {<OrderItem order={orders[-1]} />} */}
        </div>
      }

    </div>
  )
}

export default MyOrders