import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Pagination, Spinner } from "flowbite-react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
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
    fetchPlaces();
  }, [indexPage]);
  const onPageChange = (currentPage) => {
    setIndexPage(currentPage);
  };
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
      <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap gap-x-6 gap-y-8 mt-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/places/" + place._id} key={place._id}>
              <div className="bg-gray-500 rounded-2xl flex mb-2 ">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square hover:transform hover:scale-105 transition duration-300 ease-in"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold ">Owner: </span> {place.owner}
              </div>
              <div className="mt-1">
                <span className="font-bold text-primary">${place.price}</span>{" "}
                per night
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
