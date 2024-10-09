import React from 'react'
import { Skeleton } from 'antd'

const ProductPageSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <div id="images" className="lg:w-1/2 w-full">
        <div className="relative aspect-square">
          <Skeleton.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} active />
        </div>

        <div className="w-full mt-5 overflow-x-scroll">
          <div className="w-full flex gap-3">
            <div className="relative h-24 w-24">
              <Skeleton.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} active />
            </div>
            <div className="relative h-24 w-24">
              <Skeleton.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} active />
            </div>
            <div className="relative h-24 w-24">
              <Skeleton.Image style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} active />
            </div>
          </div>
        </div>
      </div>

      <div id="info" className="lg:w-1/2">
        <h1 className='text-2xl font-bold'>
          <Skeleton.Input style={{ width: '100%' }} block active />
        </h1>
        <div className="mt-5 flex gap-4 items-center">
          <Skeleton.Input style={{ width: '100%', marginBottom: '8px' }} active />
        </div>
        {/* <div className="mt-3 flex gap-1">
          <Skeleton active size='small' />
        </div> */}

        <div className='mt-10'>
          <Skeleton active paragraph={{ rows: 4, }} size='small' />
        </div>

        <div className="mt-5 flex flex-col">
          <p className="text-xl font-bold mb-3">Select Color:</p>
          <div className="flex gap-2 w-40 ">
            <Skeleton.Button active size='large' block/>
          </div>
        </div>
        <div className='mt-5'>
          <p className="text-xl font-bold mb-3">Select Size:</p>
          <div className="flex gap-2 mt-2 w-40">
            <Skeleton.Button active size='large' block/>
          </div>
        </div>

        <div className='mt-12 flex gap-2'>
          <Skeleton.Button active size='large' shape='round' block />
          <Skeleton.Button active size='large' shape='round' block />
        </div>
      </div>
    </div>
  )
}

export default ProductPageSkeleton