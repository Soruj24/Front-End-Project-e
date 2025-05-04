import { useParams } from "react-router-dom";
import ProductCard from "@/components/products/ProductCard";
import { useGetProductsQuery } from "@/services/productsApi";

const CategoryPage = () => {
    const { category } = useParams();
    console.log(category);
    const { data: products, isLoading, error } = useGetProductsQuery({ search: category });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 capitalize">
                {category?.replace(/-/g, ' ')}
            </h1>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading products</p>}

            {products?.products?.length === 0 && !isLoading && !error && (
                <p className="text-center text-gray-500">No products found in this category</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products?.products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={{ ...product, id: product.id.toString() }}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;