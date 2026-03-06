import * as React from "react";
import { useNavigate } from "react-router";

interface CardListProps {
  id: string;
  imageSrc: string;
  title: string;
  description?: string;
  navigateTo: string;
}

const CardList: React.FC<CardListProps> = ({
  id,
  imageSrc,
  title,
  description,
  navigateTo,
}) => {
  const navigate = useNavigate();

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
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default CardList;
