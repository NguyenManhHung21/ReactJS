import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const userData = { name, email, password };
    try {
      const checkEmailExits = await axios
        .get(`/check-email/${email}`)
        .then((res) => res.data);
      if (checkEmailExits.isEmailExist) {
        toast.error(
          "This email is already existed. Please try with another email!"
        );
        return;
      }
      await axios.post("/register", userData);
      setName("");
      setEmail("");
      setPassword("");
      toast.success("Registration successful. Now you can log in!");
    } catch (e) {
      toast.error("Registration failed. Please try again later!.");
    }
  };
  return (
    <div className="grow flex items-center justify-around ">
      <div className="mb-32 border shadow-xl p-12">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            value={name}
            className="w-full border px-2 py-3 rounded-tl-lg rounded-tr-lg"
            type="text"
            name=""
            id=""
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
          <input
            value={email}
            className="w-full border px-2 py-3"
            type="email"
            name=""
            placeholder="your@email.com"
            id=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            className="w-full border px-2 py-3 rounded-bl-lg rounded-br-lg"
            type="password"
            name=""
            placeholder="password"
            id=""
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?&nbsp;
            <Link className="text-black underline " to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
