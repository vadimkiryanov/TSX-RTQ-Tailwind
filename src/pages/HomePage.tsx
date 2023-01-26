import React from "react";
import ReposCard from "../components/ReposCard";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../redux/store/github/github.api";

const HomePage = () => {
  // Стейт поиской строки
  const [searchValue, setSearchValue] = React.useState<string>("");
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
    setIsDropDown(false)
  };

  return (
    <>
      <div className="mx-auto flex  justify-center pt-10">
        {isLoading && <p className="text-center text-blue-600">Loading...</p>}
      </div>
      <div className="mx-auto flex  justify-center pt-10">
        {isError && <p className="text-center text-red-600">Something went wrong</p>}
      </div>
      <div className="relative mx-auto w-[560px]">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="mb-2 h-11 w-full border py-2 px-4 "
          placeholder="Search for Github username..."
        />
        {isDropDown && (
          <ul className="absolute top-11 left-0 right-0 max-h-52 list-none overflow-y-scroll bg-white shadow-md">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              data?.map((obj, objId) => (
                <li
                  className="cursor-pointer px-4 py-2 transition-colors hover:bg-[#352f44] hover:text-white"
                  key={objId}
                  onClick={() => clickHandler(obj.login)}
                >
                  {obj.login}
                </li>
              ))
            )}
          </ul>
        )}

        <div className="container max-h-[600px] overflow-y-auto shadow-md">
          {reposLoading && <p className="text-center">Repos loading...</p>}
          {reposData?.map((objRepo, objRepoId) => (
            <ReposCard key={objRepoId} repos={objRepo} />

            // <p key={objRepoId} className="text-center">
            //   {objRepo.url}
            // </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
