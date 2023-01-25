// RTQ
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // не забыть дописывать /react
import { IServerResponse, IUser } from "../../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api", // путь к апи
  // Базовая настройка запроса
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/", // url по умолчанию
  }),
  // Дополнительные варианты/параметры запросов
  endpoints: (buid) => ({
    // Типизация запроса: 1 - какие типы данных получаем с сервера, 2 - какой тип данных передаем в параматеры запроса
    // Также это название 'searchUsers' - может быть любым
    searchUsers: buid.query<IUser[], string>({
      // Дублируем тип данных для параметра запроса
      query: (search: string) => ({
        url: "search/users",
        params: {
          q: search, // q - добавляем ключ-префикс в URL, search - сам передаваемый параметр
          per_page: 10, // ограничиваем количество получаемых элементов
        },
      }),

      // Трансформация респонса с сервера | Отсекание лишних данных
      transformResponse: (response: IServerResponse<IUser>) => {
        return response.items; // Из респонса оставляем только поле items
      },
    }),
  }),
});

// Получение кастомного хука
export const { useSearchUsersQuery } = githubApi;
