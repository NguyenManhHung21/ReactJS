import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal } from "flowbite-react";
import PayButton from "../components/PayButton";
export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [showDel, setShowDel] = useState(false);
  const [bookingId, setBookingId] = useState("");
  // const [subtotal, setSubtotal] = useState('');
  const reloadData = () => {
    try {
      axios.get("/bookings").then((res) => {
        setBookings(res.data);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  useEffect(() => {
    try {
      axios.get("/bookings").then((res) => {
        setBookings(res.data);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, []);
  const handleCancelPlace = (id) => {
    try {
      axios.delete(`/cancel-booking/${id}`).then(() => {
        reloadData();
        toast.success("You have successfully canceled your reservation!");
      });
    } catch (error) {
      console.error(`Error: ${err}`);
    }
  };
  return (
    <div>
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-4"
              key={booking._id}
            >
              <div className="flex w-32 grow-0 shrink-0">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>
                <div className="text-xl">
                  <BookingDates
                    className="my-2 text-gray-500"
                    booking={booking}
                  />
                  <div className=" flex items-center gap-1 ">
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
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-2xl ">
                      Total price:{" "}
                      <strong className="text-primary">${booking.price}</strong>
                    </span>
                  </div>
                </div>
              </div>
              <Button
                color="failure"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDel(true);
                  setBookingId(booking._id);
                }}
                className="flex items-center bg-red-500 px-2 text-white hover:opacity-80"
              >
                Cancel&nbsp;
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
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Button>
              <Modal
                show={showDel}
                size="md"
                popup={true}
                onClose={(e) => {
                  e.preventDefault();
                  setShowDel(false);
                }}
                
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-w-16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to cancel this reservation?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={(e) => {
                          e.preventDefault();
                          handleCancelPlace(bookingId);
                          setShowDel(false);
                        }}
                      >
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowDel(false);
                        }}
                      >
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </Link>
          ))}
        {bookings.length !== 0 && (
          <div className="mt-5 flex flex-col items-end">
            <div className="w-1/3 text-2xl flex justify-between ">
              <p>Subtotal</p>
              <strong>
                ${bookings.reduce((total, booking) => total + booking.price, 0)}
              </strong>
            </div>
            <p className="w-1/3 text-gray-400 mt-2">
              Taxes and shipping calculated at checkout
            </p>
            <PayButton bookings={bookings} />
          </div>
        )}
      </div>
      <div>
        {bookings.length == 0 && (
          <h2 className="text-2xl text-center font-bold dark:text-white">
            You have not book any places yet!
          </h2>
        )}
      </div>
    </div>
  );
}
