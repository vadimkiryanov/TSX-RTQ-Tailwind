import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { githubActions } from "./../redux/store/github/github.slice";

// Достаем список редюсеров
const actions = {
  ...githubActions,
};

// Кастомный хук использования reducers из редакса
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch); // bindActionCreators - собирает набор редюсера и их диспатчит
};
