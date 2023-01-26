import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";

export interface IBtnLinkProps {
  children: ReactNode;
  toPath: string;
}

// Вынести отдельно
const BtnLink: React.FC<IBtnLinkProps> = (props) => {
  const { children, toPath } = props;
  return (
    <Link
      className="mr-2 rounded-md bg-[#352f44] px-4 py-2 font-bold   transition-colors hover:bg-white hover:text-[#352f44]"
      to={toPath}
    >
      {children}
    </Link>
  );
};

// Основной
const Navigation = () => {
  // Достаем данных из редакс
  const { favourites } = useAppSelector((state) => state.github);

  return (
    <nav className="flex h-20 items-center justify-between bg-[#2a2438] px-5 text-white shadow-md">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <BtnLink toPath="/">Home</BtnLink>
        <BtnLink toPath="/favourites">Favourites {favourites.length}</BtnLink>
      </span>
    </nav>
  );
};

export default Navigation;
