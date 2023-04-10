import React, { useEffect, useState } from "react";
import {verifyCredentials} from '../login/verifyCredentials';
import AddApartmentModal from "../AddApartmentModal";
import ApartmentSelectComponent from "../ApartmentSelectComponent";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  Modal
} from "@mui/material"
import { auth, firebase } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ExtLoginComponent() {

  let navigate = useNavigate();
  const [newUser, setNewUser] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function googleLogin() {
    //1 - init Google Auth Provider
    const provider = new firebase.auth.GoogleAuthProvider();
    //2 - create the popup signIn
    await auth.signInWithPopup(provider).then(
      async (result) => {
        //3 - pick the result and store the token
        const token = await auth?.currentUser?.getIdToken(true);
        const user = {
          "uid": auth.currentUser.uid,
          "name": auth.currentUser.displayName,
          "email": auth.currentUser.email,
          "pfp": auth.currentUser.photoURL,
        }
        //4 - check if have token in the current user
        if (token) {
          //5 - put the token at localStorage (We'll use this to make requests)
          localStorage.setItem("@userToken", token);
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("@user", JSON.stringify(user));
          localStorage.setItem("@pfp", user.pfp);
          //6 - navigate user to the home page
          navSignIn();
          console.log(newUser)
          if (newUser && window.localStorage.getItem("@apartment") !== 'undefined') {
            //ask them to input their apartment
            setOpen(true);
            navigate('./'); //nav to their apartment
          } else if (window.localStorage.getItem("@apartment") === 'undefined') {
            console.log(open)
            setOpen(true);
            //navigate('/'); //stay on current page
          } else {
            localStorage.setItem("@apartment", );
            
          }
        //  window.location.reload(false);
        }
      },
      function (error) {
        console.log(error);
      }
    );

    function navSignIn() {
      const fetchData = async () => {
        setNewUser(await verifyCredentials(navigate, true));
      }
      console.log(newUser)

      fetchData();
    }
  }

  return (
      <div className="login-buttons">
        <IconButton onClick={googleLogin} sx={{ p: 0 }}>
          <Avatar src="google_icon.png"></Avatar>
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography>Where are you living?</Typography>
                <ApartmentSelectComponent></ApartmentSelectComponent>
                <AddApartmentModal txt="Don't See an Apartment? Request to Add One!"></AddApartmentModal>
            </Box>
        </Modal>
      </div>
  );
}