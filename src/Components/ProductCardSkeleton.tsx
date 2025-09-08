// src/components/ProductCardSkeleton.tsx

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="flex justify-between items-center mb-2">
          <div className="h-6 w-16 bg-gray-300 rounded"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded mb-4"></div>
        <div className="flex justify-between">
          <div className="h-10 w-24 bg-gray-300 rounded"></div>
          <div className="h-10 w-10 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
