import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function BookedWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  const bookThisPlace = async () => {
    try {
      if (!user) {
        toast.error("You need to login before booking!");
        return;
      }
      booked.forEach((book) => {
        if (book.place == place._id) {
          console.log("đã đặt");
        }
      });
      if (place.owner === user._id) {
        toast.error("You can not book this place. Cause you are the owner!");
        return;
      }
      const response = await axios.post("/bookings", {
        place: place._id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price: numberOfNights * place.price,
      });
      const bookingId = response.data._id;
      setRedirect(`/account/bookings`);
      toast.success("The reservation was successful!");
    } catch (err) {
      toast.error("You need to enter all of fields!");
    }
  };

  if (redirect) return <Navigate to={redirect} />;
  return (
    <div className="bg-gray-100 shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price:{" "}
        <span className="text-primary font-semibold">${place.price}</span> / per
        night
      </div>
      <div className="bg-white border rounded-2xl mt-4">
        <div className="flex">
          <div className=" px-4 py-3">
            <label>Check in:</label>
            <input
              disabled
              className="rounded-xl"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className=" px-4 py-3 border-l">
            <label>Check out:</label>
            <input
              disabled
              className="rounded-xl"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="px-4 py-2 border-t">
          <label>Number of guests</label>
          <input
            disabled
            type="number"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="px-4 py-2">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <div className="bg-gray-400 py-3 mt-4 text-white rounded-xl text-center font-semibold border border-gray-300">
        The place is already booked!
      </div>
    </div>
  );
}
