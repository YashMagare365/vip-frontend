import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import CardSlider from '../components/shared/CardSlider';
import ProductPageSkeleton from '../components/skeletons/ProductPageSkeleton';
import { Skeleton } from 'antd'

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  let deliveryDays = 7;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${id}`, { headers: { token: Cookies.get('token') } })
      .then(response => {
        setProduct(response.data.productData);
        setSelectedColor(response.data.productData.color)
        setSelectedSize(response.data.productData.size)
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });

    axios.get(`${import.meta.env.VITE_API_URL}/api/product?id=${id}&variant=true`)
      .then(response => {
        setVariants(response.data.productData);

        const uniqueColors = new Set();
        const uniqueSizes = new Set();
        response.data.productData.forEach(variant => {
          uniqueColors.add(variant.color);
          uniqueSizes.add(variant.size);
        });

        setColors([...uniqueColors]);
        setSizes([...uniqueSizes]);
      })
      .catch(error => {
        console.error('Error fetching variants:', error);
      });

  }, [id]);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/category/women\'s clothing/?limit=9`)
      .then(response => {
        setRelatedProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching related products:', error);
      });
  }
    , [product]);

  const handleAddtoCart = (e) => {
    const product = {
      product: id,
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    }
    axios.post(`${import.meta.env.VITE_API_URL}/api/cart/addItem`, product, {
      headers: {
        token: Cookies.get('token')
      }
    })
      .then(response => {
        console.log(response);
        e.target.innerHTML = 'Added Suceessfully!';
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
    console.log(product)
  }

  const handleColorClick = (color) => {
    const selectedVariant = variants.find(variant => variant.color === color && variant.size === selectedSize);
    if (selectedVariant) {
      setSizes([])
      setColors([])
      setProduct({})
      setVariants([])
      navigate(`/product/${selectedVariant._id}`);
    }
  };

  const handleSizeClick = (size) => {
    const selectedVariant = variants.find(variant => variant.size === size && variant.color === selectedColor);
    if (selectedVariant) {
      setSizes([])
      setColors([])
      setProduct({})
      setVariants([])
      navigate(`/product/${selectedVariant._id}`);
    }
  };

  return (
    <div className='lg:w-10/12 w-full px-3 lg:mx-auto my-10'>
      {Object.keys(product).length > 0 ?
        <div className="flex flex-col lg:flex-row gap-10">
          <div id="images" className="lg:w-1/2 w-full">
            <div className="aspect-square">
              <img
                src={product.images && product.images[currentImageIndex]}
                className="h-full w-full object-contain rounded-md border"
              />
            </div>

            <div className="w-full mt-5 overflow-x-scroll">
              <div className="w-full flex gap-3">
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`h-24 w-24 object-contain rounded cursor-pointer ${currentImageIndex == index ? 'p-1 border-2 border-gray-700' : 'border'}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div id="info" className="lg:w-1/2">
            <h1 className='text-2xl font-bold'>{product.name}</h1>
            <div className="mt-5 flex gap-4 items-center">
              <p className='text-gray-800 text-3xl font-bold'>Rs. {Math.round(product.price - (product.price * ((product.discount) / 100)))}</p>
              <p className="text-2xl italic text-gray-500 line-through">{product.price && product.price}</p>
              <span className='rounded px-2 h-max border border-green-500 text-green-500'>{product.discount}% off</span>
            </div>
            <div className="mt-3 flex gap-1">
              {Array.from({ length: 5 }, (_, index) => {
                return index <= product.rating - 1 ? <StarFilled key={index} className='text-yellow-500' /> : <StarOutlined key={index} className='text-yellow-500' />
              })}
            </div>

            <div className='mt-10' dangerouslySetInnerHTML={{ __html: product.description }}></div>

            <div className="mt-5 flex flex-col">
              <p className="text-xl font-bold mb-3">Select Color:</p>
              <div className="flex gap-2">
                {colors.length > 0 ? colors.map(color => (
                  <div
                    key={color}
                    className={`h-10 w-10 rounded-full cursor-pointer border ${selectedColor === color ? 'p-1 border-2 border-black' : 'p-1 border-gray-400'}`}

                    onClick={() => {
                      setSelectedColor(color);
                      handleColorClick(color);
                    }}
                  >
                    <div className="h-full w-full rounded-full" style={{ backgroundColor: color }}></div>
                  </div>
                )) :
                  <div className="w-40 ">
                    <Skeleton.Button active size='large' block />
                  </div>
                }
              </div>
            </div>
            <div className='mt-5'>
              <p className="text-xl font-bold mb-3">Select Size:</p>
              <div className="flex gap-2 mt-2">
                {sizes.length > 0 ? sizes.map(size => (
                  <button
                    key={size}
                    className={`border h-10 w-10 flex items-center justify-center cursor-pointer text-xl rounded ${selectedSize === size ? 'border-2 border-gray-800' : 'border-gray-400'}`}
                    onClick={() => {
                      setSelectedSize(size);
                      handleSizeClick(size);
                    }}
                  >
                    {size}
                  </button>
                )) :
                <div className="w-40 ">
                  <Skeleton.Button active size='large' block />
                </div>
                }
              </div>
            </div>

            <div className='mt-12 flex gap-2'>
              <Link to={`/checkout/${product._id}`} state={{ products: product._id, totalPrice: product.price, totalQuantity: 1 }} className='w-1/2 text-lg font-bold text-center bg-black text-white px-4 py-2 mt-5 rounded-full'>Buy Now</Link>
              <button className='w-1/2 text-lg font-bold border border-black px-4 py-2 mt-5 rounded-full' onClick={handleAddtoCart}>Add to cart</button>
              {/* <Link to=“features” state={{“energy”}}> */}
            </div>
            <p className="text-sm mt-2 text-gray-500">Expected Delivery within {deliveryDays} days</p>
          </div>

        </div> :
        <ProductPageSkeleton />
      }

      <div className='my-10'>
        <h3 className="text-2xl mb-4 font-bold text-gray-800">Related Products</h3>
        <CardSlider products={relatedProducts} />
      </div>

      <div className='my-10'>
        <h3 className="text-2xl mb-4 font-bold text-gray-800">Same Category</h3>
        <CardSlider products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
