import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MenuOutlined, UserOutlined, LogoutOutlined, ShoppingCartOutlined, HomeOutlined, ManOutlined, WomanOutlined, PhoneOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slices/UsrSlice';
import { updateLogin } from '../../redux/slices/LoginSlice';
import SearchBar from './SearchBar';

const navLinks = [
  { title: 'Home', path: '/', icon: <HomeOutlined /> },
  { title: 'Men', path: '/mens-collection', icon: <ManOutlined /> },
  { title: 'Women', path: '/womens-collection', icon: <WomanOutlined /> },
  { title: 'Contact', path: '/contact', icon: <PhoneOutlined /> },
]

const Navbar = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false);

  const login = useSelector(state => state.login)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsSticky(scrollPosition > 100)
    };

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  }, []);



  const logout = () => {
    Cookies.remove('token')
    dispatch(updateUser({}))
    dispatch(updateLogin(false))
    setTimeout(() => window.location.reload(), 1000)
  }

  const items = [
    {
      key: '1',
      label: (
        <Link to={'/account'} className="flex items-center">
          <UserOutlined />
          <span className="ml-4">Profile</span>
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to='/my-orders' className="flex items-center">
          <UserOutlined />
          <span className="ml-4">My Orders</span>
        </Link>
      ),
    },
    {
      key: '3',
      danger: true,
      label: (
        <div className="flex items-center" onClick={logout}>
          <LogoutOutlined />
          <span className="ml-4">Logout</span>
        </div>
      ),
    },
  ]

  return (
    <header className={isSticky ? 'fixed top-0 z-50 w-full' : ''}>
      <nav className="lg:px-16 px-6 bg-white shadow-md flex flex-col md:flex-row md:flex-wrap items-center lg:justify-between pb-3 lg:pb-0">
        <div className="w-full md:w-max flex gap-6 items-center">
          <div className="cursor-pointer md:hidden block" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuOutlined />
          </div>
          <Link to="/">
            <h1 className='text-3xl font-extrabold italic py-4'>vip</h1>
          </Link>
          <div className='ml-auto flex items-center gap-4 md:hidden'>
            {login.isLoggedIn ?
              <Dropdown menu={{ items, }}>
                <Avatar icon={<UserOutlined />} />
              </Dropdown> :
              <Link to='/login' className="py-1 px-4 rounded-md border border-orange-500 text-orange-500 font-bold">Login</Link>
            }

            <Link to='/cart' className='text-2xl'><ShoppingCartOutlined /></Link>
          </div>
        </div>

        <div className={`lg:flex lg:items-center md:w-auto lg:order-last w-full ${isMenuOpen ? 'max-sm:h-52' : 'max-sm:h-0'} md:ml-auto lg:ml-0 overflow-hidden duration-300`}>
          <nav className='flex gap-5'>
            <ul className="text-xl lg:text-center lg:items-center gap-4 pt-4 md:gap-8 lg:text-lg flex flex-col md:flex-row md:pt-0">
              {navLinks.map((link, index) => (
                <li key={index} className={`${location.pathname === link.path ? 'text-black font-bold' : 'text-slate-600'}`} onClick={() => setIsMenuOpen(false)}>
                  <Link to={link.path}><span className="mr-5 md:hidden">{link.icon}</span>{link.title}</Link>
                </li>
              ))}
            </ul>

            <div className='ml-5 flex items-center gap-4 max-sm:hidden'>
              {login.isLoggedIn ?
                <>
                  <Dropdown menu={{ items, }}>
                    <Avatar icon={<UserOutlined />} />
                  </Dropdown>
                  <Link to='/cart' className='text-2xl'><ShoppingCartOutlined /></Link>
                </>
                :
                <Link to='/login' className="py-1 px-4 rounded-md border border-orange-500 text-orange-500 font-bold">Login</Link>
              }


            </div>
          </nav>
        </div>

        <div className=' w-full lg:w-96'>
          <SearchBar />
        </div>
      </nav>
    </header>
  )
}

export default Navbar