/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import img from "../assets/img/logo_haiku.png";





export default function ButtonAppBar() {
  return (

    <Box sx={{ flexGrow: 1, p: 2 }} mb={-4} >
      <AppBar
        sx={{
          position: "fixed",
          bgcolor: "rgba(255,255,255,0)",
          color: "whitesmoke",
        }}
        style={{ position: 'fixed', top: 20 , left : 0, height: 36 }}
        elevation={0}
        className="blur"
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/">
              <img src={img} className="logoHaiku"></img>
            </a>
          </Typography>
          {localStorage.getItem("userIsLogged") ? (
            <>
              <div className="navUserTotem">
                <a href="/profil" className="navUserImgLink">
                  <img
                    src={`${localStorage.getItem("userTotem")}`}
                    className="navUserImg"
                  />
                </a>
              </div>
            </>
          ) : (
            <div className="buttonNav">
              <Button
              style={{textTransform: 'none'}}
                color="inherit"
                href="/connexion"
                sx={{ border: "solid 1px whitesmoke", borderRadius: "18px", pl:2, pr:2 }}
              >
                connexion
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
