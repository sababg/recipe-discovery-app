import * as React from "react";
import type { CategoriesDataType } from "../type";
import CardList from "../utils/CardList";
import Loading from "../utils/Loading";
import { useFetch } from "./hook/fetchHook";

const RecipeList: React.FC = () => {
  const [showAll, setShowAll] = React.useState(false);

  const {
    data,
    loading,
    error: err,
  } = useFetch<CategoriesDataType>(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
  );

  if (loading) return <Loading size={10} />;

  if (err) {
    throw new Error(err);
  }

  return (
    <>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-3 overflow-auto sm:w-[90%] w-[95%]">
        {(data?.categories ?? [])
          .slice(0, showAll ? undefined : 4)
          .map((category) => (
            <CardList
              key={category.idCategory}
              id={category.idCategory}
              imageSrc={category.strCategoryThumb}
              title={category.strCategory}
              description={category.strCategoryDescription}
              navigateTo={`/category/${category.strCategory}`}
            />
          ))}
      </div>
      <button
        onClick={() => setShowAll((s) => !s)}
        className="bg-gray-300 mt-7 hover:bg-white text-black font-bold py-2 px-4 rounded cursor-pointer"
      >
        {showAll ? "Show less" : "Show more"}
      </button>
    </>
  );
};

export default RecipeList;
