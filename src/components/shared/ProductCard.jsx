import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, type }) => {
  return (
    <Link to={`/product/${product._id}`} className={`${ type === 'primary' ? 'max-w-72 md:w-72' : 'max-w-52 md:w-52'} flex flex-col rounded-lg border shadow hover:scale-[103%] hover:shadow-lg duration-300 overflow-hidden`}>
      <img src={product.images && product.images[0] || product.image} className={`w-full ${ type === 'primary' ? 'h-44 lg:h-72' : 'h-40 lg:h-52'} object-cover`} />
                    {/* temporary conditions for fakestore  */}
      <div className='p-4'>
        <h3 className='text-xl font-bold line-clamp-2'>{product.name || product.title}</h3>
        <p className='my-2 line-clamp-3'>{product.description}</p>
        <h3 className='text-xl font-bold text-slate-800'>$ {product.price}</h3>
      </div>
    </Link>
  )
}

export default ProductCard;