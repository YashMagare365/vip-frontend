import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductCard from '../components/shared/ProductCard';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import Cookies from 'js-cookie';

const Mens = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/product?s=0&n=10`, { headers: { token: Cookies.get('token') } })
      .then(res => {
        setProducts(res.data.productData)
        setLoading(false);
      })
      .catch(err => console.log(err))

  }, [])

  return (
    <div className='my-10'>
      <h1 className="my-20 text-3xl font-bold text-center"><span className='text-4xl italic text-orange-500'>Stylishly Suave</span><br /> Explore Our Latest Men's Collection!</h1>
      <div className='w-full md:w-max mx-auto grid grid-cols-2 lg:grid-cols-3 gap-5'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
        ) : (
          products.map((item, index) => <ProductCard key={index} product={item} type={'primary'}/>)
        )}
      </div>
    </div>
  )
}

export default Mens