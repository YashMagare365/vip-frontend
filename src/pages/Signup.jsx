import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../assets/images/login.jpg'
import { Form, Input, InputNumber } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/slices/UsrSlice'
import { updateLogin } from '../redux/slices/LoginSlice'
import Cookies from 'js-cookie'

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOTPStep, setIsOTPStep] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [user, setUser] = useState({})

  const [otp, setOtp] = useState('');

  const handleOTPChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 5) {
      setOtp(value);
    }
  };

  const handleSubmit = async (e) => {
    if (!isOTPStep) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      setIsLoading(true)

      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phoneno: phone })
        .then((res) => {
          console.log(res);
          setIsOTPStep(true)
          setIsLoading(false)
        }).catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
    }
    else {
      setIsLoading(true)
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { name, phoneno: phone, otp })
        .then(res => {
          const token = res.data.token;
          if (token) {
            Cookies.set('token', token);
          }

          if (res.data.success) {
            console.log(res.data.token)
            axios.put(`${import.meta.env.VITE_API_URL}/api/user`, { name, phoneno: phone, email, password }, {
              headers: { token }
            })
              .then(res => {
                axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
                  headers: { token }
                })
                  .then(res => {

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
              })
              .catch(err => {
                console.log(err)
                setIsLoading(false)
              })
          }
          else {
            alert('Invalid OTP');
            setIsLoading(false)
          }
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false)
        })
    }
  }

  return (
    <div className='h-screen w-full bg-orange-50 absolute top-0 left-0 z-20 overscroll-contain'>
      <div className='flex w-full h-full'>

        <div className='w-1/2 h-full max-sm:hidden'>
          <img className='h-full w-full object-cover opacity-90' src={login} alt="Login" />
        </div>

        <div className='h-full w-full md:w-1/2 max-sm:px-3 justify-center items-center flex flex-col'>

          <div className='w-full max-w-[400px] bg-white rounded-xl p-10 shadow-lg'>
            <div className='text-2xl font-bold italic mb-5'>
              Create a new Account
            </div>

            <Form variant='filled' horizontal onFinish={handleSubmit}>

              {!isOTPStep ?
                <>
                  <Form.Item name={'name'} rules={[{ required: true, message: 'please enter full name' }]}>
                    <Input type="text" placeholder='Full Name' size='large' value={name} onChange={(e) => setName(e.target.value)}></Input>
                  </Form.Item>

                  <Form.Item name={'phone'}
                    rules={[{
                      type: 'number', required: true, message: 'please enter your Phone number',
                      transform(value) {
                        return Number(value)
                      },
                    }]}>
                    <InputNumber className='w-full' maxLength={10} pattern="[1-9]{1}[0-9]{9}" addonBefore="+91" controls={false} size='large' mask="1111 111 111" name='phoneno' placeholder='Phone no' value={phone} onChange={(value) => setPhone('+91' + value)} />
                  </Form.Item>

                  <Form.Item name={'email'} rules={[{ required: true, message: 'please enter your email' }]}>
                    <Input type="email" placeholder='Email' size='large' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                  </Form.Item>

                  <Form.Item name={'password'} rules={[{ required: true, message: 'please set a password' }]}>
                    <Input.Password name='password' type='password' placeholder='Set a Password' size='large' value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Item>

                  <Form.Item name={'confirmPassword'} rules={[{ required: true, message: 'please confirm the password' }]}>
                    <Input.Password name='confirmPassword' type='password' placeholder='Confirm the Password' size='large' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </Form.Item>
                </>
                :
                <div>
                  <p className='text-xl mb-4'>A 5-Digit OTP has been sent to your phone number</p>

                  <div className='text-xl font-bold italic mb-5'>
                    Enter OTP
                  </div>

                  <input
                    type="text"
                    value={otp}
                    onChange={handleOTPChange}
                    maxLength={5}
                    className="w-full h-10 px-3 mt-1 mb-3 text-2xl font-bold tracking-[1rem] text-center border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-orange-200"
                  />
                </div>
              }


              <Form.Item name={'submit'}>
                <button
                  type='submit'
                  className={`w-full p-2 text-base text-white rounded-lg bg-orange-500 hover:bg-orange-600 ${isLoading && 'cursor-not-allowed opacity-60'}`}
                >{isLoading ? 'Please wait...' : isOTPStep ? 'Verify' : 'Signup'}</button>
              </Form.Item>

            </Form>

            <div className='mt-5 flex text-center gap-2 justify-center text-sm'>
              <p>Already have an account?</p>
              <Link to='/login' className='font-boldx text-orange-600 underline'>LogIn</Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Signup
