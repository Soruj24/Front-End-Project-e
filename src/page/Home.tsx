import ProductsList from "@/components/products/ProductsList";
import CategoriesList from "@/components/categories/CategoriesList";

const Home = () => {
  return (
    <div className="space-y-8">
      <CategoriesList />
      <ProductsList />
    </div>
  );
};

export default Home;
