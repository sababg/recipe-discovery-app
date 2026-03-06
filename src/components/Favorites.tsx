import * as React from "react";
import { useContext } from "react";
import { Link } from "react-router";
import CardList from "../utils/CardList";
import Loading from "../utils/Loading";
import { FavoritesContext } from "./context/contexts";
import { useFetchFavorites } from "./hook/useFetchFavorites";

const Favorites: React.FC = () => {
  const { favoriteIds } = useContext(FavoritesContext);

  const { recipes, loading, error } = useFetchFavorites(favoriteIds);

  if (loading) return <Loading size={10} />;
  if (error) return <div>{error}</div>;

  const hasNoFavorites = favoriteIds.length === 0;

  return (
    <div style={{ padding: 12 }}>
      <h2 className="text-2xl font-bold mb-4">Favorites</h2>

      {hasNoFavorites ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-black">
          <p className="mb-2">You haven’t added any favorites yet.</p>
          <p className="mb-3">
            Browse recipes and tap the heart to save your favorites.
          </p>

          <Link
            to="/"
            className="inline-flex items-center rounded-md bg-black text-white px-3 py-2 text-sm"
          >
            Browse recipes
          </Link>
        </div>
      ) : recipes.length === 0 ? (
        <p>Your favorites list is empty.</p>
      ) : (
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-3">
          {recipes.map((r) => (
            <CardList
              key={r.idMeal}
              id={r.idMeal}
              imageSrc={r.strMealThumb}
              title={r.strMeal}
              description={r.strCategory ?? ""}
              navigateTo={`/recipe/${r.idMeal}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
