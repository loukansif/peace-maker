import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabsProfil from "./TabsProfil.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import imgSettings from "../assets/img/settings.svg";
import NewHaikuButton from "./NewHaikuButton.jsx";
import TabsAuthorProfil from "./TabsAuthorProfil.jsx";

export default function AuthorProfil() {
  let navigate = useNavigate();
  let idParams = useParams();
  let authorId = idParams._id;

  const [haikus, setHaikus] = useState([]);
  const [haikusUser, setHaikusUser] = useState([])
  const [authorIdNumber, setAuthorIdNumber] = useState("");
  const [userTotem, setUserTotem] = useState("")
  const [userProfil, setUserProfil] = useState({});
  
  const getHaikus = () => {
      fetch(`http://localhost:5000/haikus`)
      .then((resp) => {
          return resp.json();
      })
      .then((jresponse) => {
          setHaikus(jresponse);
          console.log(jresponse);
        })
        .then(() => {
            setAuthorIdNumber(idParams._id)
            const haikuFiltered = haikus.filter((haiku) => haiku.user._id == authorIdNumber);
            setUserTotem(haikuFiltered[0].user.totem)
            setHaikusUser(haikuFiltered)
            console.log(haikuFiltered)
       }) 
      .catch((error) => {
        console.log("ERREUR");
      });
  };

  const getUserProfile = () => {
    fetch(`http://localhost:5000/users/${authorId}`)
      .then((resp) => resp.json())
      .then((jresponse) => {
        setUserProfil(jresponse);
      });
  };
  

  useEffect(() => {
    getHaikus();
    console.log(authorIdNumber);
  }, []);

  

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            position: "fixed",
            bgcolor: "rgba(255,255,255,0)",
            color: "whitesmoke",
          }}
          elevation={0}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
            </Typography>
                <div className="navUserTotem">
                        <img
                            src={userTotem}
                            className="navUserImg"
                        />
                </div>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="main">
        <TabsAuthorProfil />
        <NewHaikuButton />
      </div>
    </>
  );
}
