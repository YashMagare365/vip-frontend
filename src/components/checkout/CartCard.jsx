import React from 'react'
import {Row,Col} from 'antd'

const CartCard = ({product,state,quantity}) => {
  // console.log('from cart cards state=',state)
  console.log('from cartcard=',product)
  return (
    <div className='m-auto'>                                  
      <Row className='m-auto justify-center items-center'>
        <Col span={8}>
          {/* <img src={`${product.image[0]}`} alt="" /> */}
        </Col>
        <Col span={8}>
          <div className='ml-7'>{`${product.name} * ${quantity}`}</div>
        </Col>
        <Col span={8}>
          <div>{product.price}</div>
        </Col>
      </Row>
    </div>
  )
}

export default CartCard
