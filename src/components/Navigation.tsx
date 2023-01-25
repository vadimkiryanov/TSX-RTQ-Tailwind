import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

export interface IBtnLinkProps {
  children: ReactNode;
  toPath: string;
}

// Вынести отдельно
const BtnLink: React.FC<IBtnLinkProps> = (props) => {
  const { children, toPath } = props;
  return (
    <Link className="mr-2 rounded-md bg-[#352f44] px-4 py-2 font-bold   transition-colors hover:text-blue-400" to={toPath}>
      {children}
    </Link>
  );
};

// Основной
const Navigation = () => {
  return (
    <nav className="flex h-20 items-center justify-between bg-[#2a2438] px-5 text-white shadow-md">
      <h3 className="font-bold">Github Search</h3>

      <span>
        <BtnLink toPath="/">Home</BtnLink>
        <BtnLink toPath="/favourites">Favourites</BtnLink>
      </span>
    </nav>
  );
};

export default Navigation;
