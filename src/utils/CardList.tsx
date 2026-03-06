import * as React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { FavoritesContext } from "../components/context/contexts";
import { HeartIcon } from "./HeartIcon";

interface CardListProps {
  id: string;
  imageSrc: string;
  title: string;
  description?: string;
  hasFavorite?: boolean;
  navigateTo: string;
}

const CardList: React.FC<CardListProps> = ({
  id,
  imageSrc,
  title,
  description,
  navigateTo,
  hasFavorite = false,
}) => {
  const navigate = useNavigate();

  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoritesContext);

  const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!id) return;
    if (isFavorite(id)) removeFavorite(id);
    else addFavorite(id);
  };
  return (
    <div
      key={id}
      className="bg-gray-100 p-4 rounded-lg text-black relative cursor-pointer"
      onClick={() => navigate(navigateTo)}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-32 object-cover rounded-md mb-8"
      />
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="font-bold text-xl">{title}</h3>
        {hasFavorite && (
          <button
            onClick={(e) => handleToggleFavorite(e)}
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
        )}
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default CardList;
