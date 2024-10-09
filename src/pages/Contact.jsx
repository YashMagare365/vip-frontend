import React from 'react'
import {Input, Button,Form,InputNumber} from 'antd'
import axios from 'axios';
const {TextArea} = Input

const Contact = () => {


  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      lg: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24, offset: -2 },
      sm: { span: 12, offset: 2 },
      md: { span: 12, offset: 5},
      lg: { span: 12, offset: 5},
    },
  };

  return (
    <div className='h-full w-full'>
      <div className='wd-full  flex flex-wrap sm:flex-wrap justify-around'>
        <div className='text-center lg:w-2/4 justify-center items-center sm:w-full mb-14 '>
          <div className='text-center flex flex-col flex-nowrap '>
            <div className='m-10 text-2xl'>
              ONLINE INQUIRY
            </div>
            <div className='w-full h-full justify-center items-center flex flex-col'>
              <Form {...formItemLayout} className='w-full ml-5 justify-center items-center lg:ml-1 max-sm:ml-2' onFinish={async(e)=>{
                
                console.log(e)
                await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/form`,{
                    name:e.Name,
                    email:e.Email,
                    phone:Number(e.phone),
                    reasonForContacting:e.reason,
                    message:e.message,
                  
                })
              }}>
                <div className='justify-center items-center'>
                  <Form.Item name='Name' hasFeedback rules={[{required: true, message:'please enter your name'}]}>
                  <Input placeholder='Name' variant='filled'/>
                </Form.Item>
                  <Form.Item name='Email' hasFeedback rules={[{required: true, message:'please enter your email'}]}>
                  <Input placeholder='Email' type='email' variant='filled'/>
                </Form.Item>
                  <Form.Item name='phone' hasFeedback rules={[{type:'number', required: true, message:'please enter your Phone number',
                            transform(value) {
                                return Number(value)
                            },
                        }]}>
                  <InputNumber className='w-full' maxLength={10} pattern="[1-9]{1}[0-9]{9}" addonBefore="+91" controls={false} size='middle' mask="1111 111 111" name='phoneno' placeholder='Phone no'/>
                </Form.Item>
                  <Form.Item name='reason' hasFeedback rules={[{required: true, message:'enter the reason for contacting'}]}>
                  <Input placeholder='Reason for Contacting' variant='filled'/>
                </Form.Item>
                  <Form.Item name='message' hasFeedback rules={[{required: true, message:'enter the message'}]}>
                  <TextArea placeholder='Message' variant='filled'/>
                </Form.Item>
                  <Form.Item name='submit' hasFeedback >
                    <Button block className='bg-orange-500' type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
        <div className='text-center lg:w-2/4 sm:w-full'>
          <div className='text-center flex flex-col flex-nowrap bg-slate-100 pb-16 h-full items-center'>
            <div className='m-10 text-2xl'>
              CONTACT DETAILS
            </div>
            <div className='mb-4'>
              xyz@gmail.com <br/>
              9999999999
            </div>
            <div className='mb-2 w-2/4 text-center'>
              <b>Address</b><br />
              <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi assumenda exercitationem doloremque voluptatem atque saepe!</p>
            </div>
            <div className='mb-2 w-2/4 text-center'>
              <b>Office</b><br />
              <p className='text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi assumenda exercitationem doloremque voluptatem atque saepe!</p>
            </div>
            <div className='mb-2 w-2/4 text-center'>
              <b>Map</b><br />
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.414235173026!2d75.3174984745542!3d19.864723081509126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb99c3c92b612d%3A0x4421c855188247fb!2sDeogiri%20College!5e0!3m2!1sen!2sin!4v1715521580327!5m2!1sen!2sin"className='w-full h-full' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
