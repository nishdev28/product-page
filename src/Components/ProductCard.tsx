// src/components/ProductCard.tsx
import type { Product } from '../types/Product';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain p-4"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-indigo-600 font-bold">${product.price}</span>
          <Rating rating={product.rating} />
        </div>
        <div className="mb-2">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded uppercase font-semibold tracking-wide">
            {product.category}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between">
          <Link 
            to={`/product/${product.id}`}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart}
            className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
          >
            <i className="fa-solid fa-cart-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;