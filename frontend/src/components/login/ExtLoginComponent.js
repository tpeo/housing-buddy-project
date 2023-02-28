import React from "react";
import { auth, firebase } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function ExtLoginComponent() {

  let navigate = useNavigate();
  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    await auth.signInWithPopup(provider).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@userToken", token);
          localStorage.setItem("loggedIn", true);
          //6 - navigate user to the home page
          navigate("/");
        }
      },
      function (error) {
        console.log(error);
      }
    );
  }

  return (
      <div className="login-buttons">
        <button className="login-provider-button" onClick={googleLogin}>
        <img src="https://img.icons8.com/ios-filled/50/000000/google-logo.png" alt="google icon"/>
        <span> Continue with Google</span>
       </button>
      </div>
  );
}