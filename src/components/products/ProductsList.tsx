import { useState } from "react";
import { useGetProductsQuery } from "@/services/productsApi";
import ProductCard from "./ProductCard";
import { useDebounce } from "@/hooks/useDebounce";

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Server-side search and pagination
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductsQuery({
    search: debouncedSearch,
    limit: productsPerPage,
    skip: (currentPage - 1) * productsPerPage,
  });

  let products = response?.products || [];

  // Apply client-side price sorting
  products = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalItems = response?.total || 0;

  // Calculate total pages using totalItems from API
  const totalPages = Math.ceil(totalItems / productsPerPage);

  // Pagination handlers
  const handleCurrentChange = (pageNumber: number) =>
    setCurrentPage(pageNumber);
  const handlePreviousChange = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextChange = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  const getVisiblePageNumbers = () => {
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded w-full"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded"
        >
          <option value="default">Default Sorting</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products && products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id?.toString() ?? ""}
                product={{
                  ...product,
                  id: product.id?.toString() ?? "",
                }}
              />
            ))
          : !isLoading &&
            !error && (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
      </div>

      {/* Pagination Controls */}
      <div className="my-3 text-center">
        <button
          disabled={currentPage === 1}
          onClick={handleFirstPage}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          First Page
        </button>
        <button
          onClick={handlePreviousChange}
          disabled={currentPage === 1}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handleCurrentChange(pageNumber)}
            className={`mx-2 px-2 py-2 rounded-md transition-colors ${
              currentPage === pageNumber
                ? "bg-blue-700 text-white font-bold"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={handleNextChange}
          disabled={currentPage === totalPages}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Next
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={handleLastPage}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default ProductsList;
