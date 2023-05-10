import { Link } from "react-router-dom";

export default function CheckoutSuccessPage() {
  return (
    <div className="text-center mt-16">
      <h2 className="text-primary text-3xl font-sans font-extrabold">
        Thank you for your booking
      </h2>
      <p className="text-sm mt-3 text-gray-500">
        We are currently processing your placed and will send you a confirmation
        email shortly
      </p>
      <div className="mt-9 mb-12">
        <Link
          className=" bg-primary text-white px-14 py-3 rounded-lg hover:opacity-75"
          to={"/"}
        >
          Continue Booking
        </Link>
      </div>
      <p>2023 @Airbnb</p>
    </div>
  );
}
