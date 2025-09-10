// src/pages/ProductList.tsx

import ProductCard from '../Components/ProductCard';
import ProductCardSkeleton from '../Components/ProductCardSkeleton';
import { useProducts } from '../hooks/useProducts';

const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error</strong>
          <span className="block sm:inline"> {error.message} </span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)
          : products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
};

export default ProductList;
