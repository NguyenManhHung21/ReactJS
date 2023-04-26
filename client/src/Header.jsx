import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import PlaceImg from "./PlaceImg";
import { Modal, Box } from "@mui/material";
import replace from "react-string-replace";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
  maxHeight: 600,
  overflow: "auto",
};

export default function Header() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [numResults, setNumResults] = useState(5);
  // const searchFirstPlace = useRef([]);
  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  useEffect(() => {
    try {
      const fetchPlaces = async () => {
        const res = await axios.get("/places");
        setPlaces(res.data.results);
      };
      fetchPlaces();
    } catch (error) {
      console.error(error);
    }
  }, []);
  const searchResults = places.filter((place) =>
    place.title.toLowerCase().includes(search.toLowerCase())
  );
  // useEffect(() => {
  //   if (show) {
  //     setTimeout(() => inputRef.current?.focus(), 10);
  //     // console.log(inputRef.current);
  //   }
  // }, [show]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setNumResults(5);
  };

  const showMoreResults = () => {
    setNumResults(numResults + 2); // tăng số lượng kết quả hiển thị lên
  };
  return (
    <header className=" flex justify-between">
      {/* logo */}
      <Link to={"/"} className="flex items-center gap-1 text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="font-bold text-xl">airbnc</span>
      </Link>
      {/* nav */}
      <div className="flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 ">
        <div>Anywhere</div>
        <div className="after:border after:bordeL after:border-gray-300"></div>
        <div>Any week</div>
        <div className="after:border after:bordeL after:border-gray-300"></div>
        <div>Add guests</div>
        <button
          onClick={() => {
            setShow(true);
            setSearch("");
            setTimeout(() => inputRef.current?.focus(), 5);
            inputRef.current?.focus();
          }}
          className="bg-primary text-white p-1 rounded-full transition-transform hover:scale-110 duration-100 ease-in"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <div className="flex items-center">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  ref={inputRef}
                  value={search}
                  // onKeyDown={handleSearch}
                  onChange={handleSearch}
                  style={{ paddingLeft: "36px" }}
                  type="text"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                  placeholder="Search"
                />
              </div>
              <button
                onClick={handleSearch}
                type="submit"
                className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
            <div>
              <div className="mt-4">
                {search.length != "" &&
                  places.length > 0 &&
                  searchResults.slice(0, numResults).map((place, index) => (
                    <Link
                      // ref={(el) => (searchFirstPlace.current[index] = el)}
                      onClick={() => setShow(false)}
                      key={place._id}
                      to={"/places/" + place._id}
                      className="flex items-center mt-4 cursor-pointer` gap-x-4 bg-gray-100 p-3 rounded-2xl hover:bg-blue-700 hover:text-white"
                    >
                      <div className="flex rounded-lg w-9 h-9 bg-gray-300 grow-0 shrink-0">
                        <PlaceImg className="rounded-lg" place={place} />
                      </div>
                      <div className="grow shrink">
                        {/* <h2 className="text-sm">{place.title}</h2> */}
                        <h2 className="text-sm font-semibold">
                          {replace(
                            place.title,
                            new RegExp(`(${escapeRegExp(search)})`, "gi"),
                            (match, i) => (
                              <span
                                key={i}
                                style={{ textDecoration: "underline" }}
                              >
                                {match}
                              </span>
                            )
                          )}
                        </h2>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <div className="mt-4 text-right ">
              {search.length != "" && searchResults.length > numResults && (
                <button
                  className="text-blue-700 hover:opacity-80"
                  onClick={showMoreResults}
                >
                  Show more...
                </button>
              )}
            </div>
            {search.length === 0 || searchResults.length === 0 ? (
              <h2
                before="No search results"
                className="text-gray-400 before:content-[attr(before)]"
              />
            ) : null}
          </Box>
        </Modal>
      </div>

      {/* hamberger menu and user */}
      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-3 border border-gray-300 rounded-full py-1 px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-300 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-7 h-7 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}
