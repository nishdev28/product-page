// src/pages/Cart.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useEffect, useState } from 'react';

const Cart = () => {
  const { state, removeItem, incrementQuantity, decrementQuantity, clearCart, placeOrder, resetOrder } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    resetOrder();
  }, [resetOrder]);

  const handleCheckout = () => {
    placeOrder();
    setShowSuccess(true);
    clearCart();
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    resetOrder();
    navigate('/');
  };

  if (showSuccess || state.orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-green-500 text-6xl mb-4">
            <i className="fa-solid fa-check-circle"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Yay! Your order is placed! 🎉</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <button
            onClick={handleContinueShopping}
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {state.items.map((item) => (
          <div
            key={item.id}
            className="p-4 border-b border-gray-200 flex items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />

            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-indigo-600 font-bold">${item.price}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <span className="text-lg font-semibold w-20 text-right">
                ${(item.quantity * item.price).toFixed(2)}
              </span>

              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}

        <div className="p-4 flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${state.total.toFixed(2)}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={clearCart}
              className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
            >
              Clear Cart
            </button>
            <button 
              onClick={handleCheckout}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          <i className="fa-solid fa-arrow-left mr-2"></i> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;