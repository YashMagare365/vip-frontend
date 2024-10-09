import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import ProductCard from '../components/shared/ProductCard';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';
import Cookies from 'js-cookie';
import { Select } from 'antd';
import { CloseOutlined, SwapOutlined } from '@ant-design/icons';

const SearchPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const [priceSort, setPriceSort] = useState(null)

  useEffect(() => {
    setSearchQuery(searchParams.get('q'))
  }, [searchParams])

  const fetchAllProducts = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/product?search=${searchQuery}`)
      .then(res => {
        console.log(res.data.productData)
        setProducts(res.data.productData)
        setLoading(false);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (!searchQuery) return
    setLoading(true)
    fetchAllProducts();
  }, [searchQuery])

  useEffect(() => {
    if (!priceSort) {
      setLoading(true)
      fetchAllProducts();
      return
    }
    setLoading(true)

    axios.get(`${import.meta.env.VITE_API_URL}/api/product?search=${searchQuery}&priceSort=${priceSort}`)
      .then(res => {
        setProducts(res.data.productData)
        setLoading(false);
      })
      .catch(err => console.log(err))

  }, [priceSort])

  return (
    <div>
      <div className="w-full lg:w-max px-4 lg:px-0 mx-auto my-10">
        <h1 className='text-xl'>Search Results for <span className="font-bold">"{searchQuery}"</span> : </h1>
        {!loading && products.length === 0 ? <h1 className='text-xl text-center'>No products found</h1> :
        <div>
          <div className="buttons my-10">
            <div className='flex items-center gap-2'>
              <SwapOutlined className=' rotate-90' />
              <Select
                placeholder="Sort"
                style={{ width: 180 }}
                size='large'
                onChange={(value) => setPriceSort(value)}
                options={[
                  { value: '1', label: 'Price: Low to High' },
                  { value: '-1', label: 'Price: High to Low' }
                ]}
                allowClear
              />
              {/* {priceSort && <button onClick={() => setPriceSort()}><CloseOutlined /></button>} */}
            </div>

          </div>

          <div className='w-full md:w-max mx-auto my-10 grid grid-cols-2 lg:grid-cols-3 gap-5'>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)
            ) : (
              products.map((item, index) => <ProductCard key={index} product={item} />)
            )}
          </div>
        </div>}
      </div>
    </div>
  )
}

export default SearchPage