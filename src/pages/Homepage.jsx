import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importing motion for animations
import PackageCarousel from '../components/homepage/PackageCarousel';
import { ArrowRightOutlined ,PlayCircleFilled } from '@ant-design/icons';
import learning from '../assets/images/learning.png';
import Nerd from '../assets/images/Nerd.png';

const Homepage = () => {
  // State to manage video modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to open modal
  const openModal = () => setShowModal(true);
  // Function to close modal
  const closeModal = () => setShowModal(false);

  return (
    <div className=''>
      <div className='w-full h-4/5 object-contain overflow-hidden mx-auto'>
        <div className='h-4/5 w-full bg-gray-50 relative overscroll-contain'>
          <div className='flex w-full h-full'>
            {/* Left Side: Text */}
            <motion.div
              className='w-1/2 p-5 h-full flex items-center justify-center border border-black rounded'
              initial={{ opacity: 0, x: -100 }} // Initial hidden state (offscreen to the left)
              animate={{ opacity: 1, x: 0 }} // Visible state (on-screen)
              transition={{ duration: 1 }} // Animation duration
            >
              <div className='font-light w-full mt-20'>
                <h1 className='ml-10 text-left text-5xl'>
                  The journey of <span className='text-center text-5xl bg-custom-image font-bold' style={{ backgroundImage: "url('../assets/images/textbackground.png')" }}> Learning </span> never ends,
                </h1>
                <h1 className='ml-10 text-left text-5xl'>
                  It only gets <span className='text-center text-5xl bg-custom-image font-semibold'> More Exciting.</span>
                </h1>
                <p className='ml-10 mt-10'>
                  Every teaching and learning journey is unique <br /> We'll help guide your way.
                </p>
                <Link to='/'>
                  <h1 className='bg-gray-500 w-4/12 text-white text-xl p-5 text-center rounded-md border border-gray-200 mt-10 ml-10'>
                    Enroll Now
                  </h1>
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              className="w-1/2 h-1/2 overflow-hidden object-contain border border-black rounded ml-1"
              initial={{ opacity: 0, x: 100 }} // Start with opacity 0 and slightly off to the right
              animate={{ opacity: 1, x: 0 }} // Animate it to visible
              transition={{ duration: 1 }} // Same duration as the text for smooth animation
            >
              <img 
                className='h-full w-full max-h-screen object-cover opacity-90 max-sm:hidden'
                src={learning}
                alt="Login"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simple Divider Section */}
      <motion.div
        className='w-full h-12 bg-gray-700'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
      </motion.div>
      
      <div className='w-full justify-center items-center text-center'>
        <h1 className='justify-center text-center items-center text-3xl m-5'>Our Top Courses</h1>
        <p className='justify-center text-center items-center text-gray-600'>Learn and elevate your skills with the best courses we have.</p>
      </div>

      {/* Package Carousel */}
      <PackageCarousel />
      
      <motion.div
        className='w-full h-12 bg-gray-700'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
      </motion.div>

      <div className='w-full flex justify-center items-center py-10'>
        {/* Nerd Image with YouTube Video Overlay */}
        <div className="relative w-1/2">
          <motion.div
            className="m-1 w-full h-full overflow-hidden object-contain border border-black rounded"
            initial={{ opacity: 0, x: 100 }} // Start with opacity 0 and slightly off to the right
            animate={{ opacity: 1, x: 0 }} // Animate it to visible
            transition={{ duration: 1 }} // Same duration as the text for smooth animation
          >
            <img 
              className='h-full w-full max-h-screen object-cover opacity-90 max-sm:hidden'
              src={Nerd}
              alt="Nerd"
            />
          </motion.div>
          
          {/* Overlay Button for YouTube Video */}
          <button
            onClick={openModal}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-red-600 text-white text-xl p-8 rounded-full shadow-lg hover:bg-red-700 transition duration-300">
            <PlayCircleFilled />
            </div>
          </button>
        </div>

        {/* Modal for YouTube Video */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
            <div className="bg-white rounded-lg shadow-lg w-4/5 h-4/5 p-5 relative">
              <button onClick={closeModal} className="absolute top-0 right-0 p-2 text-gray-600">
                Close
              </button>
              <iframe
                width="100%"
                height="90%"
                className='mt-5'
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual video ID
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Adding the Nerd SVG Image */}
        <motion.div
          className='m-1 w-1/2 p-5 h-full flex items-center justify-center border border-black rounded'
          initial={{ opacity: 0, x: -100 }} // Initial hidden state (offscreen to the left)
          animate={{ opacity: 1, x: 0 }} // Visible state (on-screen)
          transition={{ duration: 1 }} // Animation duration
        >
          <div className='font-light w-full mt-20'>
            <h1 className='ml-10 text-left text-5xl'>
              <span className='text-center text-5xl bg-custom-image font-bold' style={{ backgroundImage: "url('../assets/images/textbackground.png')" }}> Learning </span> never ends,
            </h1>
            <h1 className='ml-10 text-left text-5xl'>
              It only gets <span className='text-center text-5xl bg-custom-image font-semibold'> More Exciting.</span>
            </h1>
            <p className='ml-10 mt-10'>
              Every teaching and learning journey is unique <br /> We'll help guide your way.
            </p>
            <Link to='/'>
              <h1 className='bg-gray-500 w-4/12 text-white text-xl p-5 text-center rounded-md border border-gray-200 mt-10 ml-10'>
                Enroll Now <ArrowRightOutlined />
              </h1>
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        className='w-full h-12 bg-gray-700'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
      </motion.div>
    </div>
  );
}

export default Homepage;
