import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TabsFilter from "./TabsFilter.jsx";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import NewHaikuButton from "./NewHaikuButton.jsx";

export default function Filter() {
  let navigate = useNavigate();
  const { userId } = useParams();
  const [totem, setTotem] = useState("");

  const getUserById = () => {
    fetch(`http://localhost:5000/users/user/${userId}`)
      .then((resp) => resp.json())
      .then((res) => {
        setTotem(res.totem);
      });
  };

  useEffect(() => {
    getUserById();
  });

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
              <a href="/profil">
                <img src={totem} alt="" className="navUserImg" />
              </a>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="main">
        <TabsFilter />
        <NewHaikuButton />
      </div>
    </>
  );
}
