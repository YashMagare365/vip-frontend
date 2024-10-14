import React from 'react';
import { Carousel } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const PackageCarousel = () => {
  return (
    <div className="w-full px-10 py-5">
      <Carousel autoplay arrows>
        <div>
          <h3 className="h-60 bg-blue-500 text-white flex justify-center items-center rounded-lg">
            Package 1
          </h3>
        </div>
        <div>
          <h3 className="h-60 bg-green-500 text-white flex justify-center items-center rounded-lg">
            Package 2
          </h3>
        </div>
        <div>
          <h3 className="h-60 bg-red-500 text-white flex justify-center items-center rounded-lg">
            Package 3
          </h3>
        </div>
        <div>
          <h3 className="h-60 bg-purple-500 text-white flex justify-center items-center rounded-lg">
            Package 4
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default PackageCarousel;
