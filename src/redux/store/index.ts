import { githubApi } from "./github/github.api";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer, // Регистарция githubApi
  },

  // Перезапрос данных
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

// !!!!!!!!!!!!!!!!!!!!!
setupListeners(store.dispatch)