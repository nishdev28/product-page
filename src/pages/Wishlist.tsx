// src/pages/Wishlist.tsx
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import ProductCard from '../Components/ProductCard';

const Wishlist = () => {
  const { state, removeFromWishlist } = useWishlist();

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Add items to your wishlist to save them for later.
          </p>
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.items.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 text-red-600"
              aria-label="Remove from wishlist"
            >
              <i className="fa-solid fa-heart-circle-minus"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          <i className="fa-solid fa-arrow-left mr-2"></i> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Wishlist;
