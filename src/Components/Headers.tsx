// src/components/Header.tsx
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          FakeStore
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="px-3 py-1 rounded-md text-gray-600 hover:text-indigo-700"
          >
            Products
          </Link>
          <Link to="/cart" className="relative text-gray-600">
            <i className="fa-solid fa-cart-shopping text-xl"></i>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
