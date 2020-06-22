import React from "react";

const SuccessMessage = ({ msg }) => {
  return (
    <div className="fixed z-50 pt-10 sm:pt-12 left-0 top-0 w-full h-full ">
      <div className="m-auto p-12 w-9/12 sm:w-4/12 text-center bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        {msg}
        {/* <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span> */}
      </div>
    </div>
  );
};

export default SuccessMessage;
