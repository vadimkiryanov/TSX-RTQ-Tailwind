import React from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepos } from "../models/models";

import style from "./Repos.module.scss"; // Использование модуля scss

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
  //style
  return (
    <div className="wrapperRepos">
      <a href={repos.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-sm font-bold sm:text-lg ">{repos.full_name}</h2>
        <p className="text-xs sm:text-sm">
          Forks: <span className="mr-2 font-bold">{repos.forks}</span>
          Watchers: <span className="font-bold">{repos.watchers}</span>
        </p>

        <p className="text-sm font-thin">{repos.description}</p>
      </a>

      {isFav ? (
        <button className="btnDelete" onClick={removeFromFavourite}>
          Delete
        </button>
      ) : (
        <button className="btnAdd" onClick={addToFavourite}>
          Add
        </button>
      )}
    </div>
  );
};

export default ReposCard;
