import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find(item => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setMainImage(foundProduct.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className='border-t-2 pt-10'>
      <div className='flex gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto'>
            {productData.image.map((item, index) => (
              <img 
                onClick={() => setMainImage(item)} 
                src={item} 
                key={index} 
                className='w-20 h-20 object-cover cursor-pointer border'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={mainImage} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='text-2xl font-medium'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {/* Rating stars */}
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500'>{productData.description}</p>
          
          {/* Add to Cart Button - No size needed */}
          <button 
            onClick={() => addToCart(productData._id)} 
            className='bg-black text-white px-8 py-3 text-sm mt-8'
          >
            ADD TO CART
          </button>
          
          {/* Product policies */}
          <div className='mt-5 text-sm text-gray-500'>
            <p>100% Original product</p>
            <p>Cash on delivery available</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} />
    </div>
  );
};

export default Product;