import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart, navigate } = useContext(ShopContext);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = Object.entries(cartItems)
        .filter(([_, quantity]) => quantity > 0)
        .map(([productId, quantity]) => {
          const product = products.find(p => p._id === productId);
          return product ? { ...product, quantity } : null;
        })
        .filter(Boolean);
      
      setCartProducts(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartProducts.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-gray-500">Your cart is empty</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 bg-black text-white px-6 py-2 text-sm"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div>
            {cartProducts.map((item, index) => (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img 
                    className='w-16 sm:w-20' 
                    src={item.image[0]} 
                    alt={item.name} 
                  />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{item.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{item.price}</p>
                    </div>
                  </div>
                </div>
                <input 
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value);
                    if (newQuantity > 0) {
                      updateQuantity(item._id, newQuantity);
                    }
                  }} 
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                  type="number" 
                  min={1} 
                  value={item.quantity} 
                />
                <img 
                  onClick={() => removeFromCart(item._id)} 
                  className='w-4 mr-4 sm:w-5 cursor-pointer' 
                  src={assets.bin_icon} 
                  alt="Remove item" 
                />
              </div>
            ))}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal />
              <div className='w-full text-end'>
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors'
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;