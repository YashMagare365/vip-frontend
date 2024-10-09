import React, { useState, useEffect } from 'react'
import CartItem from '../components/cart/CartItem'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/cart/getItems`, {
        headers: {
          token: Cookies.get('token'),
        }
      })

      setCartItems(res.data.cartItems)
      console.log(res.data.cartItems)

      const productPromises = res.data.cartItems.map(async (item) => {
        const productRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${item.product}`);
        // console.log(item)
        const product = { ...productRes.data.productData, quantity: item.quantity || 1 };
        return product;
      });

      const fetchedProducts = await Promise.all(productPromises);
      setProducts(fetchedProducts);
      console.log(fetchedProducts)
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {

    fetchItems();
  }, []);

  useEffect(() => {
    let price = 0;
    let quantity = 0;
    let discount = 0;

    products.forEach(product => {
      price += product.price * product.quantity;
      quantity += product.quantity;
      discount += (product.price * (product.discount / 100)) * product.quantity;
    });

    setTotalPrice(price);
    setTotalQuantity(quantity);
    setTotalDiscount(discount);
  }, [products])

  const handleQuantityChange = async(productId, newQuantity,cartItemId) => {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/cart/updateItem/${cartItemId}`, {
      quantity:newQuantity
    }, {
        headers: {
            token: Cookies.get('token'),
        }
    })
    const updatedProducts = products.map(product => {
      if (product._id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    console.log(updatedProducts)
    setProducts(updatedProducts);
  }

  const handleRemoveFromCart = async (productId) => {
    console.log(productId)
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/deleteItem/${productId}`,
      { headers: { token: Cookies.get('token') } })
      .then(res => console.log(res.data))
    fetchItems();
  }

  return (
    <div className='w-full px-3 lg:w-10/12 mx-auto'>
      <h1 className="my-10 text-3xl font-bold italic">Your Cart</h1>
      {products.length > 0 ?
        <div className="my-5 flex flex-col md:flex-row justify-between gap-10">
          <div id="cart-items" className='flex flex-col lg:w-1/2 gap-3'>
            {console.log('dhantadan',cartItems[0]._id)}
            {products.map((product,index) => (
              <CartItem
                key={product._id}
                product={product}
                quantity={cartItems[index].quantity}
                cartItemId={cartItems[index]._id}
                handleQuantityChange={handleQuantityChange}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          <div id="summary" className="p-5 h-max w-full max-w-[400px] bg-orange-100 rounded-xl ">
            <h3 className="text-2xl font-bold italic mb-5">Summary</h3>
            <p className='flex justify-between'>Total Quantity: <span>{totalQuantity}</span></p>
            <p className='flex justify-between'>Tax: <span>18%</span></p>
            <p className='flex justify-between'>Discount: <span>Rs. {totalDiscount.toFixed(2)}</span></p>
            <p className='flex justify-between'>Delivery: <span>Rs. 40</span></p>
            <hr className="my-2 border-stone-800" />
            <p className='flex justify-between font-bold'>Subtotal: <span className='text-lg'>Rs. {totalPrice.toFixed(2)}</span></p>

            <Link to={`/checkout/fromcart`} state={{ products: cartItems, totalPrice: totalPrice, totalQuantity: totalQuantity }}><button className="mt-4 w-full bg-orange-500 text-white hover:bg-orange-600 py-2 rounded-lg">Place Order</button></Link>
          </div>
        </div>
        : <p className='text-2xl my-20 italic text-center'>Your Cart is empty <br />Start Shopping Now!...</p>
      }
    </div>
  )
}

export default Cart
