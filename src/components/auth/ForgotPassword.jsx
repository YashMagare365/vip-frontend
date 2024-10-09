import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Form, Input, InputNumber } from 'antd'
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slices/UsrSlice';
import { updateLogin } from '../../redux/slices/LoginSlice';

const ForgotPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [forgetStep, setForgetStep] = useState('number')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [token, setToken] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const handleOTPChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length <= 5) {
      setOtp(value);
    }
  };

  const handleSubmit = () => {
    if (forgetStep == 'number' && phone) {
      setIsLoading(true)
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phoneno: phone })
        .then((res) => {
          setForgetStep('verify')
          setIsLoading(false)
        }).catch((err) => {
          console.log(err);
          setIsLoading(false)
        })
    }
    else if (forgetStep == 'verify' && otp) {
      setIsLoading(true)
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/verify-otp`, { phoneno: phone, otp })
        .then(res => {
          console.log(res.data);

          if (res.data.success == true) {
            Cookies.set('token', res.data.token);
            setToken(res.data.token)
            setForgetStep('password')
            setIsLoading(false)
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
    else if (forgetStep == 'password' && password && confirmPassword && password == confirmPassword) {
      setIsLoading(true)
      axios.put(`${import.meta.env.VITE_API_URL}/api/user`, { password }, {
        headers: {
          token: token
        }
      })
        .then(res => {
          console.log(res.data)
          axios.get(`${import.meta.env.VITE_API_URL}/api/user`, { headers: { token: token } })
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
      alert('Please fill all the fields')
    }
  }

  return (
    <div className='w-full max-w-[400px] bg-white rounded-xl p-10 shadow-lg'>
      <div className='text-2xl font-bold italic mb-5'>
        Reset Your Password
      </div>

      <Form variant='filled' horizontal onFinish={handleSubmit}>
        {forgetStep == 'number' ?
          <>
            <Form.Item name={'phone'}
              rules={[{
                type: 'number', required: true, message: 'please enter your Phone number',
                transform(value) {
                  return Number(value)
                },
              }]}>
              <InputNumber className='w-full' maxLength={10} pattern="[1-9]{1}[0-9]{9}" addonBefore="+91" controls={false} size='large' mask="1111 111 111" name='phoneno' placeholder='Phone no' value={phone} onChange={(value) => setPhone('+91' + value)} />
            </Form.Item>
          </> :

          forgetStep == 'verify' ?
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
            :
            <>
              <Form.Item name={'password'} rules={[{ required: true, message: 'please set a password' }]}>
                <Input.Password name='password' type='password' placeholder='Set a Password' size='large' value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>

              <Form.Item name={'confirmPassword'} rules={[{ required: true, message: 'please confirm the password' }]}>
                <Input.Password name='confirmPassword' type='password' placeholder='Confirm the Password' size='large' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </Form.Item>
            </>
        }

        <Form.Item name={'submit'}>
          <button
            type='submit'
            className={`w-full p-2 text-base text-white rounded-lg bg-orange-500 hover:bg-orange-600 ${isLoading && 'cursor-not-allowed opacity-60'}`}
            disabled={isLoading} >
            {isLoading ? 'Please wait...' : forgetStep == 'verify' ? 'Verify' : 'Next'}
          </button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default ForgotPassword