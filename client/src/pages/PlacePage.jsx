import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => setPlace(res.data));
  }, [id]);

  return (
    <div className="mt-4 py-8 px-8 -mx-8">
      <h1 className="text-3xl ">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="my-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className=" bg-gray-100 -mx-24 px-24 py-8 border-t">
        <h2 className="font-semibold text-2xl">Extra Info</h2>
        <div className="text-sm text-gray-700 leading-5 mb-4 mt-2 ">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}
