import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux'
import { UserOutlined, PhoneOutlined, MailOutlined, LogoutOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/UsrSlice';
import { updateLogin } from '../redux/slices/LoginSlice';
import UpdateModal from '../components/my-account/UpdateModal';


const MyAccount = () => {
  const token = Cookies.get('token');
  const user = useSelector((state) => state.user)
  const isLoggedIn = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    Cookies.remove('token')
    dispatch(updateUser({}))
    dispatch(updateLogin(false))
    setTimeout(() => window.location.reload(), 1000)
  }

  return (
    token ?
      !isLoggedIn ? <h1 className="my-10 text-3xl font-bold italic text-center">Loading...</h1> :

        <div className='w-full lg:w-10/12 my-10 px-5 lg:mx-auto'>
          <h1 className=" text-3xl font-bold italic">My Account</h1>

          <div className='mt-10 flex flex-col md:flex-row gap-5 md:gap-10'>
            <Avatar size={100} icon={<UserOutlined />} />
            <div>
              <p className="my-2 text-2xl font-bold">{user.name}</p>
              <p className="my-2 text-xl flex items-center gap-4"><PhoneOutlined />{user.phoneno}</p>
              <p className="my-2 text-xl flex items-center gap-4"><MailOutlined />{user.email}</p>
            </div>
          </div>

          {user.address &&
            <div className='mt-10'>
              <p className="text-xl font-bold italic">Address</p>
              <p className="my-2 text-xl">{user.address}</p>
            </div>
          }

          <div className="flex gap-5 mt-8">
            <button className='flex items-center px-4 py-1 mt-5 bg-orange-500 text-white rounded-md' onClick={() => setOpen(true)}>
              <EditOutlined />
              <span className="ml-4">Edit Profile</span>
            </button>
            <button className="flex items-center px-4 py-1 mt-5  text-red-700 font-bold" onClick={logout}>
              <LogoutOutlined />
              <span className="ml-4">Logout</span>
            </button>
          </div>

          <UpdateModal user={user} open={open} setOpen={setOpen} token={token} setLoading={setLoading} />

        </div>
      :
      <div>
        <h1 className="my-28 text-gray-700 text-3xl font-bold italic text-center">Please Login to your Account</h1>
      </div>
  )
}

export default MyAccount