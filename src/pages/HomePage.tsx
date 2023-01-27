import React from "react";
import ReposCard from "../components/ReposCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../redux/store/github/github.api";

const HomePage = () => {
  // Стейт поиской строки
  const [searchValue, setSearchValue] = React.useState<string>("vadim");
  const [isDropDown, setIsDropDown] = React.useState<boolean>(false);

  // Задержка запроса
  const debounced = useDebounce(searchValue); // Кастом хук

  // Запрос на сервер
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3, // Предотвращение запроса, если символов < 3
    refetchOnFocus: true,
  });

  const [fetchRepos, { isError: reposError, isLoading: reposLoading, data: reposData }] = useLazyGetUserReposQuery();

  React.useEffect(() => {
    // toggle dropDown
    setIsDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setIsDropDown(false);
  };

  return (
    <div className="container  mx-auto px-5">
      <div className="mx-auto flex  justify-center pt-10">
        {isLoading && <p className="text-center text-blue-600">Loading...</p>}
      </div>
      <div className="mx-auto flex  justify-center pt-10">
        {isError && <p className="text-center text-red-600">Something went wrong</p>}
      </div>
      <div className="mw-[560px] relative mx-auto sm:w-[560px]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-2 h-11 w-full rounded-md border py-2 px-4"
          placeholder="Search for Github username..."
          onFocus={() => setIsDropDown(true)}
        />

        {searchValue && (
          <svg
            viewBox="0 0 32 32"
            className="absolute right-3 top-2 h-7 w-7 cursor-pointer opacity-30 transition-opacity hover:opacity-80"
            onClick={() => setSearchValue("")}
          >
            <path
              d="m7 7 18 18M7 25 25 7"
              fill="none"
              stroke="#ffffff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2px"
              className="stroke-000000"
            ></path>
          </svg>
        )}

        {isDropDown && (
          <ul className="absolute top-12 left-0 right-0 max-h-72 list-none overflow-y-scroll rounded-md bg-white shadow-md dark:border">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              data?.map((obj, objId) => (
                <li
                  className="flex cursor-pointer items-center justify-start gap-3 px-4 py-2 transition-colors hover:bg-[#352f44] hover:text-white dark:bg-[#2a2438] dark:hover:bg-[#352f44]"
                  key={objId}
                  onClick={() => clickHandler(obj.login)}
                >
                  <img src={obj.avatar_url} alt="avatar" className="w-7  rounded-md" />
                  <strong> {obj.login}</strong>
                </li>
              ))
            )}
          </ul>
        )}

        <div className="container max-h-96 overflow-y-auto shadow-md">
          {reposLoading && <p className="text-center">Repos loading...</p>}
          {reposData?.map((objRepo, objRepoId) => (
            <ReposCard key={objRepoId} repos={objRepo} />

            // <p key={objRepoId} className="text-center">
            //   {objRepo.url}
            // </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
