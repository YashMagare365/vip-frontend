import React from 'react'
import HomeCarousel from '../components/homepage/Carousel'
import HomeCards from '../components/homepage/HomeCards'

const Homepage = () => {
  
  return (
    <div>
      <div className='w-full mx-auto'>
        <HomeCarousel />
      </div>

      <div className='px-3 my-16'>
        <h3 className="text-center font-bold text-2xl lg:text-4xl my-5 lg:my-12">Browse through our top quality products</h3>
        <HomeCards filter={'women\'s clothing'} count={6}/>
      </div>

      <div className='px-3 my-16'>
        <div className="md:w-10/12 p-10 bg-sky-100 rounded-xl mx-auto mb-5">
          <div className="flex flex-col gap-4">
            <h6 className="text-5xl text-sky-700 font-bold">Men's Collection</h6>
            <p className='text-3xl font-bold'>Special Sale</p>
            <p className='text-3xl italic'>Flat 40% discount</p>
          </div>
        </div>
        <HomeCards filter={'men\'s clothing'} count={6}/>
      </div>

      <div className='px-3 my-16'>
        <div className="md:w-10/12 p-10 bg-pink-100 rounded-xl mx-auto mb-5">
          <div className="flex flex-col gap-4">
            <h6 className="text-5xl text-pink-700 font-bold">Women's Collection</h6>
            <p className='text-3xl font-bold'>Special Sale</p>
            <p className='text-3xl italic'>Flat 40% discount</p>
          </div>
        </div>
        <HomeCards filter={'women\'s clothing'} count={6}/>
      </div>
    </div>
  )
}

export default Homepage