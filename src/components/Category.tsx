import * as React from "react";
import { useParams } from "react-router";
import type { MealsDataType } from "../type";
import CardList from "../utils/CardList";
import Loading from "../utils/Loading";
import { useFetch } from "./hook/fetchHook";

const Category: React.FC = () => {
  const { categoryName } = useParams();
  const [showAll, setShowAll] = React.useState(false);

  const {
    data,
    loading,
    error: err,
  } = useFetch<MealsDataType>(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`,
  );

  if (loading) return <Loading size={10} />;

  if (err) {
    throw new Error(err);
  }

  return (
    <>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-3 overflow-auto sm:w-[90%] w-[95%]">
        {(data?.meals ?? []).slice(0, showAll ? undefined : 4).map((meal) => (
          <CardList
            key={meal.idMeal}
            id={meal.idMeal}
            imageSrc={meal.strMealThumb}
            title={meal.strMeal}
            navigateTo={`/recipe/${meal.idMeal}`}
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

export default Category;
