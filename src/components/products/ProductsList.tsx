import { useGetProductsQuery } from "@/services/productsApi";

import ProductCard from "./ProductCard";

const ProductsList = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return (
      <div className="p-4 text-red-500 text-center">Something went wrong.</div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Products List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <ProductCard
            key={product.id.toString()}
            product={{ ...product, id: product.id.toString() }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
