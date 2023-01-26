import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Ключ к localstorage
const LS_FAV_KEY = "rfk";

interface GithubState {
  favourites: string[];
}

const initialState: GithubState = {
  // Взятие данных из LS или присвоение пустового массива
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"), // JSON.parse() - из строки в привычный синтаксис
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload); // Добавление в избранное
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites)); // Сохранение в LocalStorage
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter((item) => item !== action.payload); // Удаление из избранного
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites)); // Сохранение в LocalStorage
    },
  },
});


export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;