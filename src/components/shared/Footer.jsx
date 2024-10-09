import React from 'react'
import { Link } from 'react-router-dom'
import { FacebookFilled, FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import { Button, Input, Select, Space } from 'antd';
const { Search } = Input;

const Footer = () => {
  return (
    <div className='relative bg-stone-900 text-white p-12 pb-24 grid grid-cols-1 md:grid-cols-2 lg:flex justify-between gap-10'>
      <div className='md:col-span-2 col-span-1 lg:col-span-1 '>
        <p className="text-3xl font-extrabold italic">vip</p>
        <div className='mt-5'>
          <p className="font-bold mb-3">Get in touch</p>
          <div className="flex gap-5 text-3xl">
            <Link to={'#'} className='text-stone-300 hover:text-white'><InstagramOutlined /></Link>
            <Link to={'#'} className='text-stone-300 hover:text-white'><FacebookFilled /></Link>
            <Link to={'#'} className='text-stone-300 hover:text-white'><TwitterOutlined /></Link>
          </div>
        </div>
      </div>
      <div id='footer-links' className="flex w-full lg:w-max lg:justify-center md:justify-between flex-wrap gap-10 ">
        <div>
          <p className="font-bold mb-3">Browse</p>
          <ul className='flex flex-col gap-2'>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Top Picks</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Popular</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Trending</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>All time top</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Classy</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3">Category</p>
          <ul className='flex flex-col gap-2'>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Men's Wear</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Women's Wear</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Kids collection</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3">Company</p>
          <ul className='flex flex-col gap-2'>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>About Us</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Terms & Conditions</Link></li>
            <li className='text-stone-300 hover:text-white'><Link to={'#'}>Contact</Link></li>
          </ul>
        </div>
      </div>

      <div id='footer-news' className="">
        <div className='mb-10'>
          <p className="font-bold mb-3">Subscribe to our Newsletter</p>
          <Space.Compact className='w-full max-w-96' size="large">
            <Input placeholder='Enter Your Email' />
            <Button type="primary" className='bg-orange-500 text-white'>Subscribe</Button>
          </Space.Compact>
        </div>

        <div className='w-full max-w-96'>
          <img src="/payment-methods.png" className='w-full' alt="" />
        </div>
      </div>

      <div className='absolute h-10 left-0 bottom-0 w-full flex items-center justify-center border-t border-stone-500'>
        <p className='text-stone-500'>&copy; Copyright - vip 2024</p>
      </div>
    </div>
  )
}

export default Footer