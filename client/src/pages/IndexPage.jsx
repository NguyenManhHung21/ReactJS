import axios from "axios";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Badge, Pagination, Spinner } from "flowbite-react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const [booked, setBooked] = useState([]);
  const [indexPage, setIndexPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const { ready } = useContext(UserContext);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPlaces = async () => {
      const { data } = await axios.get("/places");
      setTotalPage(Math.ceil(data.results.length / itemsPerPage));
      const places = await axios.get(
        `/places?page=${indexPage}&limit=${itemsPerPage}`
      );
      setPlaces(places.data.results);
    };
    const fetchBooked = async () => {
      const { data } = await axios.get("/bookings");
      setBooked(data);
    };
    fetchPlaces();
    fetchBooked();
  }, [indexPage]);

  const onPageChange = (currentPage) => {
    setIndexPage(currentPage);
  };
  const HiCheck = () => (
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
  if (!ready) {
    return (
      <div className="m-auto text-center">
        <Spinner aria-label="Default status example" />
        <h2 className="mt-3 text-xl">Loading...</h2>
      </div>
    );
  }
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap gap-x-6 gap-y-8 mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/places/" + place._id} key={place._id}>
              <div className="bg-gray-500 rounded-2xl flex mb-2">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square hover:transform hover:scale-105 transition duration-300 ease-in"
                    src={`${process.env.URL_API}/uploads/` + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold ">Owner: </span> {place.owner}
              </div>
              <div className="mt-1 flex justify-between">
                <div>
                  <span className="font-bold text-primary">${place.price}</span>{" "}
                  <span>per night </span>
                </div>
                {booked.forEach((book) => {
                  places.forEach((place) => {
                    if (book.place == place._id) {
                      place.isBooked = true;
                    }
                  });
                })}
                {place?.isBooked && (
                  <Badge color="indigo" icon={HiCheck}>
                    Out of room&nbsp;
                  </Badge>
                )}
              </div>
            </Link>
          ))}
      </div>
      <Pagination
        className="text-center my-10"
        currentPage={indexPage}
        totalPages={totalPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
