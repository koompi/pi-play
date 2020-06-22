import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";

const FacbookLoginn = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          {!login && (
            <FacebookLogin
              textButton=""
              cssClass="bg-blue-600 w-8 h-8 rounded-full focus:outline-none"
              appId="1095052497541475"
              autoLoad={true}
              fields="name,email,picture"
              icon="fa-facebook"
              // onClick={this.componentClicked}
              callback={responseFacebook}
            />
          )}
          {login && <img src={picture} />}
        </div>
        {login && (
          <div>
            <Redirect to="/start" />
            {/* <h1>{data.name}</h1>
            <h1>{data.email}</h1> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacbookLoginn;
