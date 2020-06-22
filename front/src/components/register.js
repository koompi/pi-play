import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
// import ParticlesBg from "particles-bg";
import SuccessfulMessage from "./Message/SuccessMessage";
import axios from "axios";
import three_dots from "../assets/bars.svg";

const Register = () => {
  const { register, handleSubmit, errors } = useForm();
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    // console.log(data);
    // fetch("http://52.221.199.235:9000/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Host: "localhost:8000",
    //   },

    //   body: JSON.stringify({
    // user_name: data.Username,
    // user_gender: data.gender,
    // user_email: data.Email,
    // user_password: data.Password,
    // phone_number: data.Phone,
    //   }),
    // })
    //   .then((res) => res.text())
    //   .then((data) => {
    //     if (data) {
    //       window.location.replace("/login");
    //     } else {
    //       alert("err");
    //     }
    //     // window.location.replace("/login");
    //     alert(data);
    //   });
    const newUser = {
      user_name: data.Username,
      user_gender: data.gender,
      user_email: data.Email,
      user_password: data.Password,
      phone_number: data.Phone,
      login_type: "local",
    };
    axios
      .post("https://backend.rielcoin.com/register", newUser)
      .then((data) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setSucessMessage(data.data.string);
        setTimeout(() => {
          setSucessMessage();
        }, 5000);
        window.location.replace("/login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {successMessage ? <SuccessfulMessage msg={successMessage} /> : null}
      {/* <ParticlesBg type="ball" bg={true} /> */}
      <div className="flex  items-center justify-center h-screen ">
        <div className="w-full max-w-md">
          <form
            // style={{ backgroundColor: "rgb(250, 255, 255, 0.625)" }}
            className="blur bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Register
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true })}
                name="Username"
                type="text"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">Username required</p>
              )}
            </div>
            <div
              // className={errors.lastName ? "field error" : "field"}
              className="mb-4"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 5 })}
                name="Email"
                type="email"
              />
              {errors.Email && (
                <p className="text-red-500 text-xs italic">Email required</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Gender
              </label>
              <div className="relative">
                <select
                  className=" block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="gender"
                  ref={register({ required: true })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs italic">Gender required</p>
              )}
            </div>
            <div
              // className={errors.lastName ? "field error" : "field"}
              className="mb-4"
            >
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 7 })}
                name="Phone"
                type="number"
              />
              {errors.Phone && (
                <p className="text-red-500 text-xs italic">Phone required</p>
              )}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold  mb-2">
                Password
              </label>
              <input
                className=" appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 8 })}
                name="Password"
                type="password"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs italic">
                  Password need more 8 character
                </p>
              )}
            </div>
            <button
              value="local"
              type="submit"
              className="mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                  // height="8"
                />
              ) : (
                "Sign Up"
              )}
            </button>
            <p className="text-center text-gray-600 mb-4">
              Have an account yet?
            </p>

            <Link to="/login">
              <button
                type="submit"
                className="mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </Link>
            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
