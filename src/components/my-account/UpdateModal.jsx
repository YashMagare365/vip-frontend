import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { updateUser } from '../../redux/slices/UsrSlice'
import {  Button, Modal, Form, Input, InputNumber, Col, Row } from 'antd'

const UpdateModal = ({ user, open, setOpen, token, setLoading }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: ''
  })
  
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    setName(user.name)
    setPhone(user.phone)
    setEmail(user.email)
    if (user.address) {
      setAddress({
        line1: user.address.split(',')[0],
        line2: user.address.split(',')[1],
        city: user.address.split(',')[2],
        state: user.address.split(',')[3],
        pincode: user.address.split(',')[4]
      })
    }
  }, [user])

  const handleOk = () => {
    setConfirmLoading(true);
    const data = {
      name,
      phoneno: phone,
      email,
      address: `${address.line1}, ${address.line2}, ${address.city}, ${address.state}, ${address.pincode}`
    }

    axios.put(`${import.meta.env.VITE_API_URL}/api/user`, data, {
      headers: { token }
    })
      .then(res => {
        window.location.reload();
      })
      .catch(err => { console.log(err); setConfirmLoading(false) })
  };

  return (
    <Modal
      open={open}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={() => setOpen(false)}
    >
      <h2 className='text-xl font-bold italic text-center mb-6'>Update Your Information</h2>

      <p className="text-sm font-bold mb-3 text-gray-800">Basic Details</p>
      <Form.Item name={'name'} rules={[{ required: true, message: 'please enter full name' }]}>
        <Input type="text" placeholder='Full Name' size='large' defaultValue={user.name} value={name} onChange={(e) => setName(e.target.value)}></Input>
      </Form.Item>

      <Form.Item name={'phone'}
        rules={[{
          type: 'number', required: true, message: 'please enter your Phone number',
          transform(value) {
            return Number(value)
          },
        }]}>
        <InputNumber className='w-full' defaultValue={user.phoneno && user.phoneno.replace('+91', '')} maxLength={10} pattern="[1-9]{1}[0-9]{9}" addonBefore="+91" controls={false} size='large' mask="1111 111 111" name='phoneno' placeholder='Phone no' value={phone} onChange={(value) => setPhone('+91' + value)} />
      </Form.Item>

      <Form.Item name={'email'} rules={[{ required: true, message: 'please enter your email' }]}>
        <Input type="email" placeholder='Email' size='large' defaultValue={user.email} value={email} onChange={(e) => setEmail(e.target.value)}></Input>
      </Form.Item>

      <p className="text-sm font-bold mb-3 text-gray-800">Address</p>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={'line1'} rules={[{ required: true, message: 'please enter address' }]}>
            <Input type="text" placeholder='Address Line 1' size='large' value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })}></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name={'line2'} rules={[{ required: true, message: 'please enter address' }]}>
            <Input type="text" placeholder='Address Line 2' size='large' value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })}></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={'city'} rules={[{ required: true, message: 'please enter city' }]}>
            <Input type="text" placeholder='City' size='large' value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={'state'} rules={[{ required: true, message: 'please enter state' }]}>
            <Input type="text" placeholder='State' size='large' value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })}></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name={'pincode'} rules={[{ required: true, message: 'please enter pincode' }]}>
            <Input type="number" placeholder='Pincode' size='large' value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}></Input>
          </Form.Item>
        </Col>
      </Row>

    </Modal>
  )
}

export default UpdateModal