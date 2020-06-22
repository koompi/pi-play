import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import jwt from "jsonwebtoken";
import three_dots from "../assets/bars.svg";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import Message from "../components/Message/Message";
import SuccessMessage from "../components/Message/SuccessMessage";

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [face, setFace] = useState({
    redirectToReferrer: false,
  });
  const onSubmit = (data) => {
    fetch("http://localhost:8000/all_login", {
      method: "POST",

      body: JSON.stringify({
        user_external_id: "default",
        user_name: "default",
        user_gender: "default",
        user_email: data.Email,
        user_password: data.Password,
        user_profile: "default",
        login_type: "local",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("local login response data: " + data);
        localStorage.setItem("token", data.string);
        console.log("data", data.string);
        const decodeToken = jwt.decode(data.string);
        console.log(decodeToken);
        if (decodeToken) {
          setSucessMessage("Successfull");
          setTimeout(() => {
            setSucessMessage();
          }, 3000);
          window.location.replace("/");
        } else {
          setMessage("Incorrect Email or Password");
          setTimeout(() => {
            setMessage();
          }, 3000);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  //Signup with google
  const responseGoogle = (response) => {
    console.log(response.profileObj);
    let user = response.profileObj;

    let user_external_id = user.googleId;
    let user_name = user.name;
    let user_gender = "default";
    let user_email = user.email;
    let user_profile = user.imageUrl;
    let login_type = "google";

    fetch("http://localhost:8000/all_login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_external_id: user_external_id,
        user_name: user_name,
        user_gender: user_gender,
        user_email: user_email,
        user_profile: user_profile,
        login_type: login_type,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        alert(err);
      });
  };

  //Signup with Facebook
  const responseFacebook = (response) => {
    console.log(response);
    console.log("facebook login");
    let user = response;

    let user_external_id = user.userID;
    let user_name = user.name;
    let user_gender = "default";
    let user_email = user.email;
    let user_profile = user.picture.data.url;
    let login_type = "facebook";

    fetch("http://localhost:8000/all_login", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_external_id: user_external_id,
        user_name: user_name,
        user_gender: user_gender,
        user_email: user_email,
        user_profile: user_profile,
        login_type: login_type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.string);

        if (localStorage.getItem("token")) {
          setSucessMessage("Successfull");
          window.location.replace("/");
        } else {
          setTimeout(() => {
            setMessage("login failed");
            setSucessMessage();
          }, 3000);
        }
      });
  };
  const componentClicked = () => {
    console.log("clicked");
  };
  if (face.redirectToReferrer || sessionStorage.getItem("userData")) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <React.Fragment>
      {message ? <Message msg={message} /> : null}
      {successMessage ? <SuccessMessage msg={successMessage} /> : null}
      <div className="flex  items-center justify-center h-screen ">
        <div className="w-full max-w-md">
          <form
            className="blur bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-gray-900 font-medium flex text-3xl  items-center justify-center mb-10">
              Login
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ref={register({ required: true, minLength: 1 })}
                name="Email"
                type="email"
              />
              {errors.Username && (
                <p className="text-red-500 text-xs italic">
                  First Name required
                </p>
              )}
            </div>
            <div className="mb-3">
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
                <p className="text-red-500 text-xs italic">Password required</p>
              )}
            </div>
            <span
              className="mb-4 cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </span>
            <button
              type="submit"
              className="focus:outline-none mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <img
                  className="justify-center mx-auto w-6 h-6"
                  src={three_dots}
                  alt="loading image"
                />
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-center text-gray-600 mb-2">Login With</p>
            <div className="flex justify-center">
              <FacebookLogin
                textButton=""
                cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
                appId=""
                fields="name,email,picture"
                icon="fa-facebook"
                callback={responseFacebook}
                onClick={componentClicked}
              />
              <div className="pl-2">
                <GoogleLogin
                  className="pl-12"
                  render={(renderProps) => (
                    <button
                      className=" bg-red-600 w-8 h-8 rounded-full focus:outline-none "
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <img src="https://img.icons8.com/color/34/000000/google-plus--v1.png" />
                    </button>
                  )}
                  clientId=""
                  buttonText="Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
            </div>

            <p className="text-center text-gray-600 mb-4">
              Don't hava an account yet?
            </p>

            <Link to="/register">
              <button
                type="submit"
                className="focus:outline-none mb-6 w-full border text-blue-700 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create account
              </button>
            </Link>
            <p className="text-center text-gray-600 ">Terms and conditions</p>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
