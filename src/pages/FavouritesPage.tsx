import React from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const FavouritesPage = () => {
  const { removeFavourite } = useActions();

  // Достаем данных из редакс
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <div className="container mx-auto flex  justify-center pt-10">
      {favourites.length === 0 ? (
        <p className="text-center text-5xl font-bold">No items.</p>
      ) : (
        <ul className="list-none">
          {favourites.map((item, itemId) => (
            <li className="m-2 flex items-center justify-between rounded-md bg-[#352f44] p-4 text-white" key={item}>
              <a href={item} target="_blank" rel="noreferrer">
                {item}
              </a>

              <span
                className="ml-4 cursor-pointer transition-colors hover:text-red-500"
                onClick={() => removeFavourite(item)}
              >
                X
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesPage;
