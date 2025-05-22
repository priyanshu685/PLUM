import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Rs.';
    const delivery_fee = 100;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({}); // Format: { productId: quantity }
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    // Simplified addToCart without size parameter
    const addToCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        
        // Increment quantity or add new item
        newCartItems[itemId] = (newCartItems[itemId] || 0) + 1;
        
        setCartItems(newCartItems);
        toast.success("Item added to cart!");

        // Sync with backend if logged in
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/add`,
                    { itemId }, // No size parameter
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Add to cart error:", error);
                toast.error(error.response?.data?.message || "Failed to add to cart");
                // Revert on error
                setCartItems(prev => {
                    const updated = { ...prev };
                    updated[itemId] -= 1;
                    if (updated[itemId] <= 0) delete updated[itemId];
                    return updated;
                });
            }
        }
    };

    // Get total number of items in cart
    const getCartCount = () => {
        return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
    };

    // Update item quantity directly
    const updateQuantity = async (itemId, newQuantity) => {
        const newCartItems = { ...cartItems };
        
        if (newQuantity <= 0) {
            delete newCartItems[itemId]; // Remove if quantity is 0
        } else {
            newCartItems[itemId] = newQuantity;
        }
        
        setCartItems(newCartItems);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/update`,
                    { itemId, quantity: newQuantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Update quantity error:", error);
                toast.error(error.response?.data?.message || "Failed to update quantity");
                // Revert to previous state
                setCartItems({ ...cartItems });
            }
        }
    };

    // Calculate total cart amount
    const getCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const product = products.find(p => p._id === itemId);
            return total + (product?.price || 0) * quantity;
        }, 0);
    };

    // Fetch all products
    const getProductsData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`);
            if (response.data.success) {
                setProducts(response.data.products.reverse());
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Fetch products error:", error);
            toast.error(error.response?.data?.message || "Failed to load products");
        }
    };

    // Get user's cart from backend
    const getUserCart = async (userToken) => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/cart/get`,
                {},
                { headers: { token: userToken } }
            );
            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }
        } catch (error) {
            console.error("Get cart error:", error);
            toast.error(error.response?.data?.message || "Failed to load cart");
        }
    };

    // Fetch products on mount
    useEffect(() => {
        getProductsData();
    }, []);

    // Handle cart synchronization when token changes
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            setToken(storedToken);
            getUserCart(storedToken);
        } else if (token) {
            getUserCart(token);
        }
    }, [token]);

    // Remove item completely from cart
    const removeFromCart = async (itemId) => {
        const newCartItems = { ...cartItems };
        delete newCartItems[itemId];
        setCartItems(newCartItems);

        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Remove item error:", error);
                toast.error(error.response?.data?.message || "Failed to remove item");
                setCartItems({ ...cartItems }); // Revert on error
            }
        }
    };

    // Clear entire cart
    const clearCart = async () => {
        setCartItems({});
        if (token) {
            try {
                await axios.post(
                    `${backendUrl}/api/cart/clear`,
                    {},
                    { headers: { token } }
                );
            } catch (error) {
                console.error("Clear cart error:", error);
                toast.error(error.response?.data?.message || "Failed to clear cart");
            }
        }
    };

    // Context value to be provided
    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        setCartItems,
        getCartCount,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartAmount,
        navigate,
        backendUrl,
        setToken,
        token
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;