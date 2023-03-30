import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      toast.success("Login successful!");
      setRedirect(true);
    } catch (err) {
      toast.error("Login failed!");
      console.log(err);
    }
  };
  //chuyển hướng ra trang chủ sau khi login thành công
  if (redirect) return <Navigate to={"/"} />;
  return (
    <div className="grow flex items-center justify-center">
      <div className="mb-44 border shadow-xl p-12">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form
          className="max-w-md mx-auto"
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-2 py-3 rounded-tl-lg rounded-tr-lg"
            type="email"
            name=""
            placeholder="your@email.com"
            id=""
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-2 py-3 rounded-bl-lg rounded-br-lg"
            type="password"
            name=""
            placeholder="password"
            id=""
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?&nbsp;
            <Link className="text-black underline " to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
