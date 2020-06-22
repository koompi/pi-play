import React, { useState, useEffect } from "react";
import useAxios from "axios-hooks";
import Navbar from "../layouts/Navbar";
import historyData from "./data/history.json";
//Global Token
var accessTokenObj = localStorage.getItem("token");

const Profile = () => {
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState("");
  const [score, setScore] = useState([{}]);

  const showMore = () => {
    setShow(!show);
    document.body.style.overflow = "hidden";
  };
  const closeShowMore = () => {
    setShow(!show);
    document.body.style.overflow = "unset";
  };

  const [profile, setProfile] = useState(null);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState({
    raw: "",
  });
  const handleImageChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const popUp = () => {
    setModal(!modal);
  };
  const cancel = (e) => {
    popUp();
    setProfile(null);
  };

  const refreshPage = () => {
    popUp();
    setTimeout("window.location.reload()", 3000);
  };

  const [
    { data, loading, error },
    //  refetch
  ] = useAxios({
    method: "get",
    url: "http://localhost:8000/userData",
    headers: {
      "Content-Type": "application/json",
      token: accessTokenObj,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return window.location.replace("/login");
  if (data) {
    console.log(data);
    if (profile === null) {
      setProfile({ ...data });
    }
  }

  const submitName = (e) => {
    e.preventDefault();
    // console.log("hello");

    /*update name*/
    fetch("http://localhost:8000/updateName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newName: profile.user_name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let a = data;
      });

    // phone_Number
    fetch("http://localhost:8000/updatePhone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: accessTokenObj,
      },
      body: JSON.stringify({
        newPhone: profile.phone_number,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        let a = data;
      });

    //Profile picture

    const formData = new FormData();
    console.log([image, setImage][0].raw);
    formData.set("image", [image, setImage][0].raw);

    fetch("http://localhost:8000/uploadProfile", {
      method: "POST",
      headers: {
        token: accessTokenObj,
      },
      body: formData,
    })
      .then((res) => res.text())
      .then((data) => console.log(data));
  };
  return (
    <React.Fragment>
      <Navbar />
      <div
        style={{ backgroundColor: "rgba(0,0,0,0.4", overflow: "visible" }}
        className={
          show
            ? " fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto"
            : "hidden"
        }
      >
        <div className="grid grid-cols-1 mb-2 overflow-hidden bg-white  mx-auto pb-12 w-4/5 sm:w-4/12  px-6 rounded-md">
          <div className="flex mt-4 justify-end">
            <svg
              onClick={closeShowMore}
              className="text-right svg-icon h-8 w-8 cursor-pointer justify-end"
              viewBox="0 0 20 20"
            >
              <path d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
            </svg>
          </div>
          <div>
            {history === ""
              ? console.log("true")
              : history.score.map((res) => (
                  <div className="grid grid-cols-1">
                    <p className="mb-2 px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                      Score: {res}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </div>

      <div
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        className={
          modal
            ? "fixed z-50 sm:pt-64 pt-24  top-0 left-0  w-full h-full overflow-auto"
            : "hidden"
        }
      >
        <div className="bg-white  mx-auto pb-12 w-4/5 sm:w-3/6 px-6 rounded-md">
          <h1 className="py-5">Edit your Profile</h1>

          <form onSubmit={submitName}>
            <div>
              <label htmlFor="upload-button">
                {image.preview ? (
                  <img
                    style={{ marginTop: "-6px" }}
                    className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                    src={image.preview}
                    alt="dummy"
                    width="300"
                    height="300"
                  />
                ) : (
                  <>
                    <img
                      style={{ marginTop: "-27px" }}
                      className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
                      src={profile ? profile.user_profile : ""}
                    />
                  </>
                )}
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                id="upload-button"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </div>

            <label className="mb-6 text-black">Name</label>
            <input
              className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
              value={profile ? profile.user_name : ""}
              name="name"
              type="text"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  user_name: e.target.value,
                })
              }
            />
            <label className="mb-6 text-black">Phone</label>
            <input
              className="rounded bg-gray-400 focus:outline-none py-1 px-1 block mb-2 w-full sm:w-full"
              value={profile ? profile.phone_number : ""}
              name="phone"
              type="number"
              onChange={(e) =>
                setProfile({
                  ...profile,
                  phone_number: e.target.value,
                })
              }
            />

            <input
              onClick={refreshPage}
              type="submit"
              value="Submit"
              className="mr-2 mt-5 cursor-pointer bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
            <input
              onClick={cancel}
              type="button"
              value="Cancel"
              className="mr-2 mt-5 cursor-pointer bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </form>
        </div>
      </div>
      <div className="  mx-auto  px-4 py-12  max-w-screen-lg sm:px-2">
        <div className=" pb-7/5 bg-black rounded-lg max-w-screen-lg w-full ">
          <img
            className="  inset-0 sm:h-auto object-cover rounded-lg  "
            src="/img/cover.jpg"
          />
        </div>
        <div className="px-4 -mt-12 sm:-mt-32  py-4 z-50  ">
          <div className="blur relative h-64 bg-white rounded-lg px-4 py-3 shadow-lg h-48 sm:h-auto">
            <img
              className=" md:-mt-20  sm:mx-auto h-24 w-24 -mt-16 md:h-32 md:w-32 rounded-full   "
              src={profile ? profile.user_profile : ""}
            />
            <div
              className="mt-2 flex  text-xl font-bold text-blue-600 text-gray-600"
            >
              <span className="ml-2 sm:mx-auto ">
                {profile ? profile.user_name : ""}
              </span>
            </div>
            <div className=" mt-16">
              <div className="mb-4 flex -mt-12 sm:justify-center  rounded-md ">
                <svg
                  className="fill-current text-gray-700 svg-icon h-8 w-8 text-justify"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                </svg>
                <span className="text-gray-700 text-lg font-semibold">
                  {profile ? profile.user_email : ""}
                </span>
              </div>
              <div className="flex mt-1 sm:justify-center rounded-md ">
                <svg
                  className="text-gray-700 fill-current svg-icon h-8 w-8 text-justify"
                  viewBox="0 0 20 20"
                >
                  <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                </svg>
                <span className="text-gray-700 text-lg font-semibold">
                  {profile ? profile.phone_number : ""}
                </span>
              </div>
              <input
                type="button"
                value="Edit Profile"
                onClick={popUp}
                className="focus:outline-none float-right mt-4 sm:-mt-12 bg-no-repeat border-blue-500 border-2 px-3 py-2 bg-blue-400 rounded-full hover:bg-blue-200 hover:text-gray-600 text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div>
          {/* {datas.map((data) => ( */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Game */}
              <div className="bg-gray-200 rounded-lg px-2 py-2">
                <center>
                  <h1 className="mb-2 font-bold text-lg">Your Game</h1>
                </center>
                <div className="grid grid-cols-2 gap-2">
                  {historyData.map((data) => {
                    const { img, title, score } = data;
                    return (
                      <div className="transition duration-500 ease-in-out transform hover:-translate-y-1 max-w-sm bg-white hover:shadow-lg cursor-pointer rounded overflow-hidden">
                        <img className="w-full" src={img} />
                        <div className=" py-4">
                          <div className="font-bold text-xl mb-2 text-center">
                            <h1>{title}</h1>
                          </div>
                        </div>
                        <div className=" px-2 mb-2">
                          <div>
                            {score.slice(0, 3).map((res) => {
                              return (
                                <div className="grid grid-cols-1 mb-2">
                                  <span className=" px-2 py-1 inline-block leading-none bg-teal-200 text-teal-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                                    Score : {res}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            onClick={() => {
                              setShow(true);
                              setHistory(data);
                              document.body.style.overflow = "hidden";
                            }}
                            className="focus:outline-none bg-blue-400 px-2 rounded-full mt-2 hover:bg-blue-200"
                          >
                            Show More
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Zeetomic */}
              <div className="bg-gray-200 rounded-lg px-2 py-2">
                <h1>ZTO</h1>
                <h1>Coming Soon</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
