/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import img from "../assets/img/logo_haiku.png";
import imgSettings from "../assets/img/settings.svg";

export default function ButtonAppBar() {
  return (
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
            <a href="/">
              <img src={img} className="logoHaiku"></img>
            </a>
          </Typography>
          {localStorage.getItem("userIsLogged") ? (
            <>
              <a href="/parametres">
                <img src={imgSettings} className="settingsLogo" />
              </a>

              <div className="navUserTotem">
                <img
                  src={`${localStorage.getItem("userTotem")}`}
                  className="navUserImg"
                />
              </div>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                href="/connexion"
                sx={{ border: "solid 1px whitesmoke", borderRadius: "15px" }}
              >
                Connexion
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
