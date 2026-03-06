import * as React from "react";
import { useSearchParams } from "react-router";
import type { RecipeDataType, RecipeType } from "../type";
import CardList from "../utils/CardList";
import Loading from "../utils/Loading";
import { useFetch } from "./hook/fetchHook";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") ?? "").trim();

  const url = React.useMemo(() => {
    if (!q) return null;
    return `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`;
  }, [q]);

  const { data, loading, error } = useFetch<RecipeDataType>(url ?? "");

  const meals: RecipeType[] = data?.meals ?? [];

  if (!q) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold mb-2">Search</h2>
        <p>Type a recipe name in the search bar to begin.</p>
      </div>
    );
  }

  if (loading) return <Loading size={10} />;
  if (error) return <div className="px-4 py-6">{error}</div>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Results for “{q}”</h2>

      {meals.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
          {meals.map((m) => (
            <CardList
              key={m.idMeal}
              id={m.idMeal}
              imageSrc={m.strMealThumb}
              title={m.strMeal}
              description={m.strCategory ?? ""}
              navigateTo={`/recipe/${m.idMeal}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
