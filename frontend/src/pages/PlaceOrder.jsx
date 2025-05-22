import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            // Prepare order items without size information
            const orderItems = Object.entries(cartItems)
                .filter(([_, quantity]) => quantity > 0)
                .map(([productId, quantity]) => {
                    const product = products.find(p => p._id === productId);
                    return product ? { 
                        ...product, 
                        quantity 
                    } : null;
                })
                .filter(Boolean);

            const orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee,
                paymentMethod: 'cod'
            };

            const response = await axios.post(
                `${backendUrl}/api/order/place`,
                orderData,
                { headers: { token } }
            );
            
            if (response.data.success) {
                setCartItems({});
                navigate('/orders');
                toast.success("Order placed successfully!");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Order placement failed");
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                
                <div className='flex gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='firstName' 
                        value={formData.firstName} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='First name' 
                    />
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='lastName' 
                        value={formData.lastName} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='Last name' 
                    />
                </div>
                
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='email' 
                    value={formData.email} 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="email" 
                    placeholder='Email address' 
                />
                
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='street' 
                    value={formData.street} 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="text" 
                    placeholder='Street' 
                />
                
                <div className='flex gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='city' 
                        value={formData.city} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='City' 
                    />
                    <input 
                        onChange={onChangeHandler} 
                        name='state' 
                        value={formData.state} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='State' 
                    />
                </div>
                
                <div className='flex gap-3'>
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='zipcode' 
                        value={formData.zipcode} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="number" 
                        placeholder='Zipcode' 
                    />
                    <input 
                        required 
                        onChange={onChangeHandler} 
                        name='country' 
                        value={formData.country} 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='Country' 
                    />
                </div>
                
                <input 
                    required 
                    onChange={onChangeHandler} 
                    name='phone' 
                    value={formData.phone} 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="number" 
                    placeholder='Phone' 
                />
            </div>

            {/* Order Summary */}
            <div className='mt-8'>
                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    
                    <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-green-400'>
                        <div className='w-3.5 h-3.5 border rounded-full bg-green-400'></div>
                        <span className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</span>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button 
                            type='submit' 
                            className='bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors'
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder;