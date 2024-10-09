import React from 'react';
import { Carousel } from 'antd';

const contentStyle = {
  height: '500px',
};

const HomeCarousel = () => {

  return (
    <Carousel autoplay>
      <div>
        <div className='h-[300px] md:h-[500px]'>
          <img src="/home-banners/home-banner-1.webp" className='h-full w-full object-cover' alt="" />
        </div>
      </div>
      <div>
        <div className='h-[300px] md:h-[500px]'>
          <img src="/home-banners/home-banner-2.webp" className='h-full w-full object-cover' alt="" />
        </div>
      </div>
      <div>
        <div className='h-[300px] md:h-[500px]'>
          <img src="/home-banners/home-banner-3.webp" className='h-full w-full object-cover' alt="" />
        </div>
      </div>
    </Carousel>
  );
}
export default HomeCarousel;