import { useState } from "react";
import { BASE_URL } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        navigate("/login");
      } else {
        console.error("register failed");
      }
    } catch (error) {
      console.error("Error during register:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData)


  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://media.istockphoto.com/id/1281150061/vector/register-account-submit-access-login-password-username-internet-online-website-concept.jpg?s=612x612&w=0&k=20&c=9HWSuA9IaU4o-CK6fALBS5eaO1ubnsM08EOYwgbwGBo="
            alt="img"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
        >
          <div className="w-full h-100">
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Register to your account
            </h1>

            <form className="mt-6" onSubmit={handelSubmit} >
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
                className="w-full block bg-sky-300 hover:bg-sky-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <hr className="my-6 border-gray-300 w-full" />

            <p className="mt-8">
              Need to Login?{" "}
              <Link
                to="/login"
                className="text-sky-500 hover:text-blue-700 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
