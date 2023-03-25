import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
    });
  }, []);
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id}>
              {booking.place} - {booking.numberOfGuests}
            </div>
          ))}
      </div>
    </div>
  );
}
