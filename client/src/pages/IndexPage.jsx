import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((res) => setPlaces(res.data));
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap gap-x-6 gap-y-8 mt-8">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/places/" + place._id} key={place._id}>
            <div className="bg-gray-500 rounded-2xl flex mb-2">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold ">Owner: </span> {place.name}
            </div>
            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
}
