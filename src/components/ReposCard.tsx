import React from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepos } from "../models/models";

interface IReposCard {
  repos: IRepos;
}

const ReposCard: React.FC<IReposCard> = ({ repos }) => {
  // Кастомный хук использования редюсеров из редакса
  const { addFavourite, removeFavourite } = useActions();

  // Достаем данных из редакс
  const { favourites } = useAppSelector((state) => state.github);

  // Наличие элемента в избранном
  const [isFav, setIsFav] = React.useState(favourites.includes(repos.html_url));

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repos.html_url);
    setIsFav(true);
  };
  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repos.html_url);
    setIsFav(false);
  };

  return (
    <div className="hover:button group mb-2 flex items-center justify-between rounded border py-3 px-5 transition-all hover:bg-[#4e4466] hover:text-white hover:shadow-md">
      <a href={repos.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold ">{repos.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="mr-2 font-bold">{repos.forks}</span>
          Watchers: <span className="font-bold">{repos.watchers}</span>
        </p>

        <p className="text-sm font-thin">{repos.description}</p>
      </a>

      {isFav ? (
        <button
          className="rounded bg-[#4e4466] py-2 px-4 font-bold text-white transition-all group-hover:bg-red-500 group-hover:text-white"
          onClick={removeFromFavourite}
        >
          Delete
        </button>
      ) : (
        <button
          className="rounded bg-[#4e4466] py-2 px-4 font-bold text-white transition-all group-hover:bg-green-500 "
          onClick={addToFavourite}
        >
          Add
        </button>
      )}
    </div>
  );
};

export default ReposCard;
