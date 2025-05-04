import { useParams } from "react-router-dom";
import { useGetProductQuery } from "@/services/productsApi";

const ProductDetails = () => {
    const { id } = useParams();
    const { data: product, isLoading, error } = useGetProductQuery(Number(id));

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img 
                        src={product.thumbnail} 
                        alt={product.title}
                        className="w-full h-auto rounded-lg"
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.title}</h1>
                    <p className="text-2xl text-primary">${product.price}</p>
                    <p className="text-sm text-gray-600">
                        {product.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                            product.stock > 0 ? "bg-green-500" : "bg-red-500"
                        }`} />
                        <span>
                            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </span>
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;