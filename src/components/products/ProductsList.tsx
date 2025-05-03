import { useState } from "react";
import { useGetProductsQuery } from "@/services/productsApi";
import ProductCard from "./ProductCard";
import { useDebounce } from "@/hooks/useDebounce";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data: products, isLoading, error } = useGetProductsQuery(); // Remove the search parameter

  // Filter products locally
  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    product.description.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
      />

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id.toString()} product={{ ...product, id: product.id.toString() }} />
          ))
        ) : (
          !isLoading && !error && (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductsList;
