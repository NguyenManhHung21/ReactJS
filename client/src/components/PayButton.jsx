import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function PayButton({ bookings }) {
  const { user } = useContext(UserContext);
  const handleCheckout = () => {
    axios
      .post("/create-checkout-session", {
        bookings,
        slugName: user.slug,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.url) window.location.href = res.data.url;
      })
      .catch((err) => console.log({ message: err }));
  };
  return (
    <>
      <button
        className="bg-blue-600 text-white w-1/3 py-2 rounded-lg mt-3 font-bold"
        onClick={handleCheckout}
      >
        Check Out
      </button>
    </>
  );
}
