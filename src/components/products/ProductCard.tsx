import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface Product {
  thumbnail: string | undefined;
  id: string;
  title: string;
  images: string;
  description: string;
  price: number;
  stock: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  if (!product) return <p>No Product</p>;

  return (
    <div>
      <Card key={product.id} className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-lg">
            {product.title.length > 20
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[200px] object-cover rounded mb-4 w-full"
          />
          <p className="text-sm text-gray-600 mb-2">
            {product.description.length > 50
              ? product.description.slice(0, 50) + "..."
              : product.description}
          </p>
          <p className="font-semibold text-primary">Price: ${product.price}</p>
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
              />
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </div>
          </div>
        </CardContent>
        <Button asChild>
          <Link to={`/product/${product.id}`}>Product Details</Link>
        </Button>
      </Card>
    </div>
  );
};

export default ProductCard;
