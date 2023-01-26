import { IRepos } from "./../../../models/models";
// RTQ
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // не забыть дописывать /react
import { IServerResponse, IUser } from "../../../models/models";

export const githubApi = createApi({
  reducerPath: "github/api", // путь к апи
  // Базовая настройка запроса
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/", // url по умолчанию
  }),
  // Перезапрос данных, если вернулись на страницу с другого сайта
  refetchOnFocus: true,
  // Дополнительные варианты/параметры запросов
  endpoints: (build) => ({
    // Типизация запроса: 1 - какие типы данных получаем с сервера, 2 - какой тип данных передаем в параматеры запроса
    // Также это название 'searchUsers' - может быть любым | useSearchUsersQuery
    searchUsers: build.query<IUser[], string>({
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

    // Получение репозиториев пользователей | useLazyGetUserReposQuery
    getUserRepos: build.query<IRepos[], string>({
      query: (userName: string) => ({
        url: `users/${userName}/repos`,
      }),
    }),

    // Создание пользователя шаблон (если бы бек это поддерживал)
    createUser: build.mutation<any, void>({
      query: () => `...someurl`,
    }),
  }),
});

// Получение кастомных хуков запроса на сервер
export const { useSearchUsersQuery, useLazyGetUserReposQuery, useCreateUserMutation } = githubApi; // lazy - позволяет нам делать запрос, когда хотим именно мы, остальные выполняют автоматически
