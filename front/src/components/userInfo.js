import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "axios-hooks";
import Navbar from "../layouts/Navbar";

var accessTokenObj = localStorage.getItem("token");

function UserInfo() {
  const [profile, setProfile] = useState(null);

  const { register } = useForm();

  const onChange = (e) => {
    // setProfile({ ...profile, [e.target.name]: e.target.value });
    const target = e.target;
    const value = target.value;
    const name = target.value;
    setProfile({
      [name]: value,
    });
    // console.log(profile);
  };
  const [modal, setModal] = useState(false);
  const popUp = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
    setProfile(null);
  };
  const submitName = (e) => {
    e.preventDefault();
    console.log("hello");
    fetch("http://52.221.199.235:9000/updateName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newName: profile.user_name,
      }),
    })
      .then((res) => res.text())
      .then((res) => console.log(res));
  };

  const [
    { data, loading, error },
    //  refetch
  ] = useAxios({
    method: "get",
    url: "http://52.221.199.235:9000/userData",
    headers: {
      "Content-Type": "application/json",
      token: accessTokenObj,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return window.location.replace("http://52.221.199.235:9000/login");
  if (data) {
    // console.log(data);
    if (profile === null) {
      setProfile({ ...data });
    }
  }

  return (
    <div>
      <Navbar />
      <div className=" flex  items-center justify-center h-screen">
        <div className=" w-full max-w-screen-md">
          <div className="overflow-hidden bg-white shadow-md rounded  ">
            <div>
              <img src="/img/cover.jpg" alt="cover" />
              <div className="px-6 sm:px-3 ">
                <img
                  className="overflow-hidden -mt-12 sm:-mt-16  h-20 w-20 md:h-32 md:w-32 rounded-full  md:mx-0 "
                  // src="/img/01-shutterstock_476340928-Irina-Bg.jpg"
                  src={profile ? profile.user_profile : ""}
                  alt="profile"
                />
                <h1 className="mt-2 ml-1 sm:ml-6 text-blue-800 text-xl font-medium">
                  {profile ? profile.user_name : ""}
                </h1>
                <div className="flex justify-end mb-2 -mt-16 sm:-mt-20 mr-2">
                  <input
                    type="button"
                    value="Edit Profile"
                    onClick={popUp}
                    className="bg-no-repeat border-blue-500 border-2 px-3 py-2 bg-blue-400 rounded-full hover:bg-blue-200 text-white cursor-pointer"
                  />

                  {/* </input> */}
                </div>
              </div>
              {/* Popup */}
              <div>
                <div
                  className={
                    modal
                      ? "block fixed z-50 -mt-64 w-auto ml-auto mr-auto left-auto  sm:w-2/5 bg-gray-900  rounded-lg p-6"
                      : "hidden"
                  }
                >
                  <h1 className="block mb-5 text-xl text-white">
                    Edit Your Profile
                  </h1>

                  <label className="text-white">Name</label>
                  <input
                    className="rounded py-1 px-1 block mb-2 w-full sm:w-full"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_name : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <label className="text-white">Email</label>
                  <input
                    className="rounded py-1 px-1 block mb-2 w-full sm:w-full"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.user_email : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="email"
                    onChange={onChange}
                  />
                  <label className="text-white">Phone</label>
                  <input
                    className="rounded py-1 px-1 block mb-2 w-full sm:w-full"
                    // type="text"
                    // name="name"change profile picture in react js
                    value={profile ? profile.phone_number : ""}
                    ref={register({ required: true, minLength: 5 })}
                    name="name"
                    type="text"
                    onChange={onChange}
                  />
                  <input
                    // onClick={onClose}
                    // className={errors.name ? "block" : "hidden"}
                    type="button"
                    value="Submit"
                    className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />

                  <input
                    type="button"
                    value="Cancel"
                    onClick={onClose}
                    className="mr-2 mt-5 cursor-pointer bg-red-700 hover:bg-red-600 text-white bg-no-repeat font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  />
                </div>
              </div>
              <div className="ml-6 mt-12 ">
                <div className=" px-3 mb-3 ">
                  <span className="text-xs ">Email</span>
                  <h1
                    // onClick={popUp}
                    className="-mb-2 font-xl text-lg   "
                  >
                    {profile ? profile.user_email : ""}
                  </h1>
                </div>
                <div className=" px-3 mb-10">
                  <span className="text-xs ">Phone</span>
                  <h1
                    // onClick={popUp}
                    className="-mb-2 font-xl text-lg   "
                  >
                    {profile ? profile.phone_number : ""}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserInfo;
