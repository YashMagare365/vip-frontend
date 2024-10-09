import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CartCard from '../components/checkout/CartCard';
import { Col, Row, Form, Input, Checkbox, Button, InputNumber } from 'antd';
import Cookies from 'js-cookie';
import { useLocation, useParams, Link } from 'react-router-dom';



const Checkout = (props) => {

    const token = Cookies.get("token")

    const [loading,setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [items, setItem] = useState([{}])
    const [fromcart,setfromcart] = useState(true)
    const [userdata,setUserData] = useState({})
    const [token1,setToken] = useState(token)

    const { type } = useParams();
    const state = useLocation().state;
    console.log(state)
    // console.log(type)
    // console.log(products)

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
            lg: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 24 },
            md: { span: 22 },
            lg: { span: 18 },
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 20,
                offset: 2,
            },
            sm: {
                span: 20,
                offset: 2,
            },
            lg: {
                span: 24,
                offset: 5,
            },
            md: {
                span: 24,
                offset: 5,
            },
        },
    };



    useEffect(() => {

        const fetchProducts = async () => {
            await axios.get(`${import.meta.env.VITE_API_URL}/api/user`,
                {headers: {
                    token: token1,
                }}
            ).then(res=>{
                setUserData(res.data.user)
                console.log('saved data=',res.data.user[0])
            })
            console.log('usrdata',userdata)
            // setUserData(userData.data.user)

            if (type === "fromcart" && state?.products) {
                try {
                    const productPromises = state.products.map(async (item) => {
                        // console.log('this is item.product', item.product);
                        const productRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${item.product}`);
                        // console.log(productRes)
                        const data = { ...productRes.data, quantity: item.quantity || 1 };
                        // console.log('this is data', data);
                        return data;
                    });

                    const fetchedProducts = await Promise.all(productPromises);
                    console.log('these are products', fetchedProducts);
                    const arr = []
                    fetchedProducts.forEach((item,index) => {
                        // arr.push(item)
                        console.log(item)
                        try {
                            const obj = {
                                id: item.productData._id,
                                quantity: state.products[index].quantity,
                            }
                            console.log('obj=',obj)
                            arr.push(obj)
                        } catch (e) {
                            console.log(e)
                        }
                    })
                    console.log('arr = ', arr)
                    setItem(arr)
                    setProducts(fetchedProducts);
                    setfromcart(true)

                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            } else {
                try {
                    const productRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${type}`);
                    // console.log(productRes)
                    const data = [productRes]
                    setProducts(data)
                    setItem([
                        {
                            id: productRes.data.productData._id,
                            quantity: 1,
                        }
                    ])
                    setfromcart(false)
                    // console.log('these are productRes',products)
                } catch (error) {
                    console.log('error', error)
                }
            }
        };

        fetchProducts();
    }, [type, state]);



    const paymentHandler = async (e) => {
        setLoading(true)
        // e.preventDefault();
        console.log(e)
        console.log(items)
        // console.log(state.totalPrice)
        console.log(products)

        // const items = [{ id: products._id, quantity: 1 }]
        const orderData = { items, shippingAddress: e.address }


        await axios.post(`${import.meta.env.VITE_API_URL}/api/order`, { orderData }, {
            headers: {
                token: token,
            }
        })

            .then(res => {
                console.log(res.data.order.razorpayOrderId)
                console.log(res.data.order)
                console.log(res.data.order.totalAmount.$numberDecimal)
                // console.log(Number(state.totalPrice))

                const key = `${import.meta.env.VITE_RZP_KEY}`

                var options = {
                    "key": key,
                    "amount": Number(state.totalPrice),
                    "currency": "INR",
                    "order_id": `${res.data.order.razorpayOrderId}`,
                    "name": "vip Groups.",
                    "description": "Monthly Test Plan",
                    "handler": async function (response) {
                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_subscription_id);
                        console.log(response.razorpay_signature);
                        console.log(response)
                        console.log(res)
                        if(type == "fromcart"){
                            state.products.map(async(item)=>{
                                await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart/deleteItem/${item._id}`,{
                                    headers: {
                                        token: Cookies.get('token'),
                                    }
                                })
                            })   
                        }
                        
                        await axios.put(`${import.meta.env.VITE_API_URL}/api/order`, {
                            orderId: res.data.order._id,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            paymentStatus: "Completed"
                        }, {
                            headers: {
                                token: token,
                            }
                        }).then(res2 => {
                            console.log(res2)
                        })
                    },
                    "prefill": {
                        "name": e.fname + " " + e.lname,
                        "email": userdata[0].email,
                        "contact": `${e.phoneno}`
                    },
                    "notes": {
                        "note_key_1": `buying `,
                        "note_key_2": `something`
                    },
                    "theme": {
                        "color": "#F37254"
                    }
                };

                const rzp1 = new window.Razorpay(options);

                rzp1.open();
                setLoading(false)
                rzp1.on('payment.failed', async function (response) {
                    // alert(response.error.code);
                    console.log(response);
                    await axios.put(`${import.meta.env.VITE_API_URL}/api/order`, {
                        orderId: res.data.order._id,
                        paymentStatus: "Failed",
                    }, {
                        headers: {
                            token: token,
                        }
                    }).then(res2 => {
                        console.log(res2)
                    })
                    setLoading(false)
                });
                // e.preventDefault();

            })

    }


    return (
        <div >
            <div className='w-full justify-center items-center bg-orange-100 py-3'>
                <div className='m-5 text-2xl text-center mb-5 font-bold'>
                    CHECKOUT
                </div>
            </div>
            <div className=' flex lg:w-full flex-nowrap h-full max-sm:flex-wrap-reverse w-full'>
                <div className='w-2/3 border boder-black max-sm:w-full'>
                    <div className='w-full'>
                        <Form
                        fields={[
                            {
                              name: ["fname"],
                              value: userdata[0]?.name,
                            },
                            {
                                name:['phone'],
                                value:userdata[0]?.phoneno.slice(3,13)
                            },
                            {
                                name:['address'],
                                value: userdata[0]?.address
                            }
                          ]}
                        name='form' variant='filled' className='mt-7 mx-10 w-5/6' onFinish={paymentHandler}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={'fname'} className='ml-5'
                                        hasFeedback rules={[{ required: true, message: 'please enter your first name' }]}>
                                        <Input name='fname' placeholder='First name' className='w-3/4' />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={'lname'}>
                                        <Input placeholder='Last name' className='w-3/4'
                                            hasFeedback rules={[{ required: true, message: 'please enter your last name' }]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name={'address'} className='ml-5 w-11/12'>
                                <Input placeholder='Address'
                                    hasFeedback rules={[{ required: true, message: 'please enter your address' }]} />
                            </Form.Item>
                            <Form.Item name={'landmark'} className='ml-5 w-11/12'>
                                <Input placeholder='Landmark' />
                            </Form.Item>
                            <Row>
                                <Col span={12}>
                                    <Form.Item name={'city'} className='ml-5'
                                        hasFeedback rules={[{ required: true, message: 'please enter city name' }]}>
                                        <Input placeholder='City name' className='w-3/4' />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name={'pincode'}>
                                        <Input placeholder='Pin Code' className='w-3/4'
                                            hasFeedback rules={[{ required: true, message: 'please enter pincode' }]} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item name='phone' hasFeedback rules={[{
                                type: 'number', required: true, message: 'please enter your Phone number',
                                transform(value) {
                                    return Number(value)
                                },
                            }]}>
                                <InputNumber className='w-1/2 ml-5' maxLength={10} pattern="[1-9]{1}[0-9]{9}" addonBefore="+91" controls={false} size='middle' mask="1111 111 111" name='phoneno' placeholder='Phone no' />
                            </Form.Item>
                            <Form.Item className='ml-5' name={'checkbox'} hasFeedback >
                                <Checkbox defaultChecked={true}>Save Address and information for future orders</Checkbox>
                            </Form.Item>
                            <Form.Item name='submit' hasFeedback className='w-11/12 ml-5'>
                                <Button loading={loading} className='bg-orange-500' block type='primary' htmlType='submit'>Next</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div className='w-1/3 border boder-black max-sm:w-full justify-between items-center pb-7'>
                    <div className='bg-orange-200 w-11/12 m-auto rounded py-5 mt-5'>
                        <div className='m-5'>
                            <h1 className='text-center text-2xl font-bold'>Your Cart</h1>
                        </div>
                        <div className='mb-3'>
                            <Row>
                                <Col span={12} className='text-center'>Total price:</Col>
                                <Col span={12} className='text-center'>{state.totalPrice}</Col>
                            </Row>
                            <Row>
                                <Col span={12} className='text-center'>Total Quantity:</Col>
                                <Col span={12} className='text-center'>{state.totalQuantity}</Col>
                            </Row>
                        </div>
                        <div className='max-h-28 bg-orange-100 w-11/12 rounded m-auto overflow-y-scroll'>
                            {console.log('main=',state)}
                            {products.map((item,index) => {
                                return (
                                    fromcart ?<CartCard product={item.productData} state={state.products[index]} quantity={state.products[index].quantity}/>:<CartCard product={item.data.productData} state={state.products} quantity={state.totalQuantity}/>
                                )
                            })}
                        </div>
                        <div className='w-11/12 m-auto items-center justify-center mt-5'>
                            <Link to={'/cart'}><Button className='bg-orange-500 w-11/12 m-auto' block type='primary' htmlType='submit'>Edit</Button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
