import { RootState } from "./../redux/store/index";
import { TypedUseSelectorHook, useSelector } from "react-redux";

// Получение типизированных данных с редакса

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
