import { useGetCategoriesQuery } from "@/services/categoriesApi";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

const CategoriesList = () => {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  if (isLoading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories</div>;

  console.log(categories);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Shop by Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-8 gap-1">
        {categories?.map((category) => {
          const categoryName =
            typeof category === "string"
              ? category
              : (category as { name: string }).name || "";
          return (
            <Link key={categoryName} to={`/category/${categoryName}`}>
              <Badge className="text-center capitalize">
                {categoryName.replace(/-/g, " ")}
              </Badge>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesList;
