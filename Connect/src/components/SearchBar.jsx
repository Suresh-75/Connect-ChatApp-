import { useEffect } from "react";
import FilterFriends from "./FilterFriends";
import axios from "axios";

function SearchBar({ SetFriends, setNotFound, setQuery, query }) {
  function handleSearch(e) {
    e.preventDefault();
  }
  useEffect(
    function () {
      async function search() {
        if (query.trim().length == 0) {
          SetFriends([]);
          setNotFound(false);
          return;
        }
        try {
          setNotFound(false);
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/${query.trim()}`,
            {
              headers: {
                token: localStorage.getItem("jwToken"),
                userID: localStorage.getItem("userID"),
              },
            }
          );
          if (res.data.users.length == 0) throw new Error("Not found");
          // console.log()
          SetFriends(res.data.users);
        } catch (err) {
          setNotFound(true);
        }
      }
      search();
      return function () {
        setNotFound(false);
        SetFriends([]);
      };
    },
    [query, SetFriends]
  );
  return (
    <form onSubmit={(e) => handleSearch(e)} className="max-w-lg mx-auto mb-10">
      <div className="flex">
        <FilterFriends />
        <div className="relative w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  focus:ring-zinc-500 focus:border-zinc-500 dark:bg-zinc-800 dark:border-s-zinc-800  dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:border-zinc-500"
            placeholder="Find friends..."
            required
          />
          {query != "" ? (
            <></>
          ) : (
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-violet-700 rounded-e-lg border border-zinc-800 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-1 dark:focus:ring-zinc-600"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
