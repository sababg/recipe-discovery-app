import * as React from "react";
import { useContext, useMemo } from "react";
import { useParams } from "react-router";
import type { IngredientKey, MeasureKey, RecipeDataType } from "../type";
import { HeartIcon } from "../utils/HeartIcon";
import Loading from "../utils/Loading";
import { FavoritesContext } from "./context/contexts";
import { useFetch } from "./hook/fetchHook";

const Recopied: React.FC = () => {
  const { recipeId } = useParams();

  const {
    data,
    loading,
    error: err,
  } = useFetch<RecipeDataType>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
  );

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const recipe = useMemo(() => {
    return data?.meals?.[0] || null;
  }, [data?.meals]);

  const id = useMemo(() => {
    if (recipeId) return recipeId;
    if (recipe?.idMeal) return recipe.idMeal;
    return "";
  }, [recipeId, recipe]);

  if (loading) return <Loading size={10} />;

  if (err) {
    throw new Error(err);
  }

  const handleToggleFavorite = () => {
    if (!id) return;
    if (isFavorite(id)) removeFavorite(id);
    else addFavorite(id);
  };

  console.log("data?.meals?.[0]", data?.meals?.[0]);

  if (!recipe) return <div>No recipe found.</div>;
  const ingredients: { ingredient: string; measure: string }[] = [];
  for (let i = 1; i <= 20; i += 1) {
    const ingKey = `strIngredient${i}` as IngredientKey;
    const measureKey = `strMeasure${i}` as MeasureKey;

    const ing = recipe[ingKey];
    const measure = recipe[measureKey];

    if (ing && ing.trim()) {
      ingredients.push({
        ingredient: ing.trim(),
        measure: (measure || "").trim(),
      });
    }
  }

  return (
    <div className="overflow-y-auto px-4 py-8">
      <h2>{recipe.strMeal}</h2>

      <div className="grid sm:sm:grid-cols-[400px_1fr] grid-cols-1 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg text-black relative cursor-pointer h-fit">
          {recipe.strMealThumb && (
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="object-cover rounded-md mb-8 w-full h-auto"
            />
          )}
          <div style={{ marginTop: 12 }}>
            <button
              onClick={handleToggleFavorite}
              disabled={!id}
              className="cursor-pointer border flex items-center justify-start gap-1.5 border-black rounded-2xl px-1.5 py-1"
            >
              <HeartIcon
                isFilled={isFavorite(id)}
                size={15}
                className="text-red-600"
              />
              {isFavorite(id) ? "Remove" : "Add"}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-3">
          <div className="flex gap-3 flex-wrap">
            {recipe.strCategory && <span>Category: {recipe.strCategory}</span>}
            {recipe.strArea && <span>Area: {recipe.strArea}</span>}
            {recipe.strTags && <span>Tags: {recipe.strTags}</span>}
          </div>

          <section>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((it, idx) => (
                <li key={idx}>
                  {it.measure
                    ? `${it.measure} ${it.ingredient}`
                    : it.ingredient}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Instructions</h3>
            <p className=" whitespace-pre-wrap">{recipe.strInstructions}</p>
          </section>

          {recipe.strSource && (
            <p className="min-w-0 wrap-break-word">
              <span className="font-medium">Source:</span>{" "}
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noreferrer"
                className="break-all underline"
              >
                {recipe.strSource}
              </a>
            </p>
          )}
          {recipe.strYoutube && (
            <p className="min-w-0 wrap-break-word">
              <span className="font-medium"> YouTube:</span>{" "}
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="break-all underline"
              >
                {recipe.strYoutube}
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recopied;
