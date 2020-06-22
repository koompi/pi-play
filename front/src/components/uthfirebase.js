import React, { useState, useEffect } from "react";
import firebase, { auth } from "firebase";
import axios from "axios";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { FirebaseAuth } from "react-firebaseui";
const Authfirebase = () => {
  const [state, setState] = useState({
    isSingedIn: false,
  });
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setState({ isSingedIn: !!user });
      console.log("user", user);
      console.log(uiConfig.signInOptions);
      console.log(user.providerData[0].providerId);

      if (user.providerData[0].providerId == "google.com") {
        let user_external_id = user.uid;
        let user_name = user.displayName;
        let user_gender = "default";
        let user_email = user.email;
        let user_profile = user.photoURL;
        let login_type = "google";

        fetch("http://localhost:8000/all_register", {
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
            console.log(data.string);
          });
      } else if (user.providerData[0].providerId == "facebook.com") {
        let user_external_id = user.uid;
        let user_name = user.displayName;
        let user_gender = "default";
        let user_email = user.email;
        let user_profile = user.photoURL;
        let login_type = "facebook";

        fetch("http://localhost:8000/all_register", {
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
            console.log(data.string);
          });
      }
    });
  }, []);
  return (
    <div>
      {state.isSingedIn ? (
        <span>
          <div>Signed In!</div>
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
          <h1>{firebase.auth().currentUser.phoneNumber}</h1>
        </span>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};

export default Authfirebase;
