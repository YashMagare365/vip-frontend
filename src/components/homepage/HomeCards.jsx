import React, { useState, useEffect } from 'react'
import axios from 'axios';
import ProductCard from '../shared/ProductCard';
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton';

const HomeCards = ({filter, count}) => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([])

  useEffect(() => {
    console.log(filter, count)
    axios.get(`https://fakestoreapi.com/products/category/${filter}/?limit=${count}`)
      .then(res => {
        setProducts(res.data)
        setLoading(false);
      })
      .catch(err => console.log(err))
    
  }, [filter, count])

  return (
    <div className='w-full md:w-max mx-auto grid grid-cols-2 lg:grid-cols-3 gap-5'>
      {loading ? (
        Array.from({ length: count }).map((_, index) => <ProductCardSkeleton key={index} type={'primary'}/>)
      ) : (
        products.map((item, index) => <ProductCard key={index} product={item} type={'primary'}/>)
      )}
    </div>
  )
}

export default HomeCards