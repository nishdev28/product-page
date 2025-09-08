import { Link, useNavigate, useParams } from 'react-router';
import { useProduct } from '../hooks/useProducts';
import Rating from '../Components/Rating';
import { useCart } from '../contexts/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProduct(id || '');
  const { addItem, state, incrementQuantity, decrementQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const cartItem = product
    ? state.items.find((item) => item.id === product.id)
    : null;

    const handleAddToCart = () => {
      if(product){
        addItem(product);
      }
    }

    const handleBuyNow = () => {
      if(product){
        addItem(product);
        navigate('/cart');
      }
    }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Back To Products
        </Link>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex animate-pulse">
            <div className="md:w-1/2 h-64 bg-gray-300"></div>
            <div className="p-6 md:w-1/2">
              <div className="h-8 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-6 bg-gray-300 rounded mb-4"></div>
              <div className="h-24 bg-gray-300 rounded mb-4"></div>
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
              <div className="h-12 bg-gray-300 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Back to Products
        </Link>
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {' '}
            Product not found
          </h2>
          <p className="text-gray-600">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i> Back to Products
      </Link>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.title}
              className="h-80 object-contain"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h2>
            <div className="flex items-center mb-4">
              <span className="text-indigo-600 font-bold text-xl">
                {product.price}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              <Rating rating={product.rating} />
            </div>
            <p className="text-gray-500 mb-4">{product.description}</p>
            <div className="mb-6">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
                {product.category}
              </span>
            </div>
            {cartItem ? (
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => decrementQuantity(product.id)}
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{cartItem.quantity}</span>
                  <button
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                    onClick={() => incrementQuantity(product.id)}
                  >
                    +
                  </button>
                </div>
                <span className="text-lg font-semibold">
                  ${(cartItem.quantity * product.price).toFixed(2)}
                </span>
              </div>
            ) : (
              <button
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors mb-4"
                onClick={handleAddToCart}
              >
                {' '}
                Add to Cart{' '}
              </button>
            )}
            <div className="flex space-x-4">
              <button className="px-4 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors flex-1" onClick={handleBuyNow}>
                Buy Now
              </button>
              <button className="px-4 py-3 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                <i className="fa-solid fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
