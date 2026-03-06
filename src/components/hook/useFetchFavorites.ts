import * as React from "react";
import type { RecipeDataType, RecipeType } from "../../type";

export const useFetchFavorites = (favoriteIds: string[]) => {
  console.log("favoriteIds", favoriteIds);
  const [recipes, setRecipes] = React.useState<RecipeType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const fetchFavorites = async () => {
      if (!favoriteIds.length) {
        setRecipes([]);
        setLoading(false);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          favoriteIds.map(async (id) => {
            const res = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            );
            if (!res.ok) throw new Error("Failed to fetch favorite");
            const json = (await res.json()) as RecipeDataType;
            return json.meals?.[0] ?? null;
          }),
        );

        const filtered = results.filter((x): x is RecipeType => x !== null);

        if (!cancelled) setRecipes(filtered);
      } catch (err) {
        if (!cancelled) {
          if (err instanceof Error) setError(err.message);
          else setError("Something went wrong");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchFavorites();

    return () => {
      cancelled = true;
    };
  }, [favoriteIds.join(",")]);

  return { recipes, loading, error };
};
