import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabsFilter from "./TabsFilter.jsx";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NewHaikuButton from "./NewHaikuButton.jsx";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Filter() {
  let navigate = useNavigate();
  const { userId } = useParams();
  const [followingArray, setFollowingArray] = useState([]);
  // const [totem, setTotem] = useState("");

  // const getUserById = () => {
  //   fetch(`http://localhost:5000/users/user/${userId}`)
  //     .then((resp) => resp.json())
  //     .then((res) => {
  //       setTotem(res.totem);
  //     });
  // };

  const getConnectUserById = () => {    
    fetch(`http://localhost:5000/users/user/${localStorage.getItem("userId")}`)
      .then((resp) => resp.json())
      .then((res) => {
        setFollowingArray(res.following);
      });
  };

  const followUser = () => {
    followingArray.push(userId);
    let newFollowing = {
      following: followingArray,
    };

    fetch(`http://localhost:5000/users/${localStorage.getItem("userEmail")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFollowing),
    })
      .then(() => {
        handleClickAlert();
        getConnectUserById();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const unfollowUser = () => {
    followingArray.splice(followingArray.indexOf(userId), 1);
    let newFollowing = {
      following: followingArray,
    };

    fetch(`http://localhost:5000/users/${localStorage.getItem("userEmail")}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFollowing),
    })
      .then(() => {
        handleClickAlertDesabonne();
        getConnectUserById();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [openDesabonne, setOpenDesabonne] = React.useState(false);

  const handleClickAlertDesabonne = () => {
    setOpenDesabonne(true);
  };

  const handleCloseAlertDesabonne = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDesabonne(false);
  };

  useEffect(() => {
    if(localStorage.getItem("userIsLogged")){
      getConnectUserById();
    }
  },[]);

  return (
    <>
      <div className="blurBackground"> </div>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            position: "fixed",
            bgcolor: "rgba(255,255,255,0)",
            color: "whitesmoke",
          }}
          elevation={0}
        >
          <div className="navProfil">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
              </Typography>
              {/* <div className="navUserTotem">
              <a href="/profil">
                <img src={totem} alt="" className="navUserImg" />
              </a>
            </div> */}
              {localStorage.getItem("userIsLogged") ? (
                !followingArray.includes(userId) ? (
                  <Button
                    className="btnFollow"
                    color="inherit"
                    style={{ textTransform: "none" }}
                    sx={{
                      border: "solid 1px whitesmoke",
                      borderRadius: "18px",
                    }}
                    onClick={() => {
                      followUser();
                    }}
                  >
                    Suivre
                  </Button>
                ) : (
                  <Button
                    className="btnFollow"
                    color="inherit"
                    style={{ textTransform: "none" }}
                    sx={{
                      border: "solid 1px whitesmoke",
                      borderRadius: "18px",
                    }}
                    onClick={() => {
                      unfollowUser();
                    }}
                  >
                    Désabonner
                  </Button>
                )
              ) : null}
            </Toolbar>
          </div>
        </AppBar>
      </Box>
      <div className="main">
        <TabsFilter />
        <NewHaikuButton />
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Vous êtes abonné!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openDesabonne}
        autoHideDuration={2000}
        onClose={handleCloseAlertDesabonne}
      >
        <Alert
          onClose={handleCloseAlertDesabonne}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Vous êtes désabonné!
        </Alert>
      </Snackbar>
    </>
  );
}
