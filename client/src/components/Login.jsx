import { useState } from "react";
import { BASE_URL } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        login(data.user, data.token, data.role);
        navigate("/"); 
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during Login:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <>
      <section className="flex flex-col md:flex-row h-80vh items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-1/2 h-full ">
          <img
            src="https://www.ewshopping.com/assets/imgs/Login.jpg"
            alt="img"
            className="w-full h-fit object-cover "
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>

            <form className="mt-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  required
                  autoFocus
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full block bg-blue-700 hover:bg-blue-600 focus:bg-blue-700 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Need an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
