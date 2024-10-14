import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import homepageimg from '../assets/images/homepageimg.png'
import { Form, Input, InputNumber, Button } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie';
import ForgotPassword from '../components/auth/ForgotPassword'
import { useDispatch } from 'react-redux'//add this for basic redux setup
import { updateName, updateEmail, updateId, updatePhone, updateUser } from '../redux/slices/UsrSlice'//add this for basic redux setup
import { updateLogin } from '../redux/slices/LoginSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [toggeler, setToggler] = useState(false)
  const [isForgetPage, setIsForgetPage] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [phoneno, setPhoneno] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    const data = { phoneno, password }
    setIsLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, data)
      .then(res => {
        if (res.data.success) {
          Cookies.set('token', res.data.token);

          axios.get(`${import.meta.env.VITE_API_URL}/api/user`, { headers: { token: res.data.token } })
            .then(res => {
              const token = res.data.token;
              if (token) {
                Cookies.set('token', token);
              }

              // const user = {
              //   name: res.data.user.name,
              //   email: res.data.user.email,
              //   phone: res.data.user.phoneno,
              //   id: res.data.user.id,
              // }
              const user = res.data.user;
              dispatch(updateUser(user));
              dispatch(updateLogin(true))

              navigate('/')
            })
        }
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className='h-screen w-full bg-orange-50 absolute top-0 left-0 z-20 overscroll-contain'>
      <div className='flex w-full h-full'>

        <div className='w-1/2 h-full max-sm:hidden'>
          <img className='h-full w-full object-cover opacity-90' src={homepageimg} alt="Login" />
        </div>

        <div className='h-full w-full md:w-1/2 max-sm:px-3 justify-center items-center flex flex-col'>
          {!isForgetPage ? <div className='w-full max-w-[400px] bg-white rounded-xl p-10 shadow-lg'>
            <div className='text-2xl font-bold italic mb-5'>
              Login
            </div>

            <Form variant='filled' horizontal onFinish={handleLogin}>
              {toggeler ?
                <Form.Item name={'email'} rules={[{ required: true, message: 'please enter your email' }]}>
                  <Input type="email" placeholder='email' size='large' value={email} onChange={e => setEmail(e.target.value)}></Input>
                </Form.Item> :
                <Form.Item name={'phone'}
                  rules={[{
                    type: 'number', required: true, message: 'please enter your Phone number',
                    transform(value) {
                      return Number(value)
                    },
                  }]}>
                  <InputNumber
                    className='w-full'
                    maxLength={10} pattern="[1-9]{1}[0-9]{9}"
                    addonBefore="+91" controls={false}
                    size='large' mask="1111 111 111"
                    name='phoneno' placeholder='Phone no'
                    value={phoneno} onChange={value => setPhoneno('+91' + value)}
                  />
                </Form.Item>}



              <Form.Item name={'password'} rules={[{ required: true, message: 'please enter correct password' }]}>
                <Input.Password name='password' type='password' placeholder='password' size='large' value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item name={'submit'}>
                <button
                  type='submit'
                  className={`w-full p-2 text-base text-white rounded-lg bg-orange-500 hover:bg-orange-600 ${isLoading && 'cursor-not-allowed opacity-60'}`}
                >{isLoading ? 'Please wait...' : 'Log In'}</button>
              </Form.Item>

              
              <div className='mt-[-18px] mb-4 w-full flex justify-end'>
                <button className=" text-sm text-orange-500 underline" onClick={() => setIsForgetPage(true)}>Forgot Password?</button>
              </div>

            </Form>

            {/* <div className=''>
              <button className='w-full font-bold text-orange-600' onClick={(e) => {
                setToggler(!toggeler)
              }}>{toggeler ? 'Login with Phone' : 'Login with Email'}</button>
            </div> */}
            <div className='mt-5 flex text-center gap-2 justify-center text-sm'>
              <p>Don't have an account?</p>
              <Link to='/signup' className='font-boldx text-orange-600 underline'>Signup</Link>
            </div>
          </div> :
            <ForgotPassword />
          }
        </div>

      </div>
    </div>
  )
}

export default Login
