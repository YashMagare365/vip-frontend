import React from 'react'
import { Skeleton } from 'antd'

const ProductCardSkeleton = () => {
  return (
    <div className='max-w-72 md:w-72 flex flex-col rounded-lg border overflow-hidden'>
      <div className='w-full h-44 lg:h-60 object-contain' style={{ position: 'relative' }}>
        <Skeleton.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} active />
      </div>
      <div className='p-4'>
        <Skeleton.Input style={{ width: '100%', marginBottom: '8px' }} active />
        <Skeleton active paragraph={{ rows: 4, }} size='small' />
      </div>
    </div>
  )
}

export default ProductCardSkeleton