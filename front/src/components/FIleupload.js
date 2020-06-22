import React, { Fragment, useState } from "react";

import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  var accessTokenObj = localStorage.getItem("token");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log([file, setFile][0]);
    formData.set("image", [file, setFile][0]);

    fetch("http://52.221.199.235:9000/uploadProfile", {
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
    <Fragment>
      {/* {message ? <Message msg={message} /> : null} */}
      <form onSubmit={onSubmit} id="upload-form">
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>

        {/* <Progress percentage={uploadPercentage} /> */}

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            {/* <h3 className="text-center">{uploadedFile.fileName}</h3> */}
            <img src={uploadedFile.filePath} alt="" />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
