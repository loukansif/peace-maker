/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { sizing } from '@mui/system';
import img from "../assets/img/logo_haiku.png";


export default function ButtonAppBar() {

  // declaration des infos de deconnexion
  const deconnect = () => {
    localStorage.setItem("userLastName", "")
    localStorage.setItem("userFirtsName", "")
    localStorage.setItem("userEmail", "")
    localStorage.setItem("userImg", "")
    localStorage.setItem("userIsLogged", "")
    localStorage.setItem("userAdmin", "")
    window.location.reload()
  }

  // test pour faire apparaitre le profil
localStorage.setItem("userImg",'/logo192.png')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{position:"fixed", bgcolor:"rgba(255,255,255,0.1)", color :"whitesmoke"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <a href="/">
              <img src={img} className="logoHaiku"></img>
            </a>
          </Typography>
          {localStorage.getItem('userIsLogged') ?
            <>
              
              <Button color="inherit" href="/profil">
                <img src={`${localStorage.getItem('userImg')}`} ></img>
              </Button>
            </>

            :  <Button color="inherit" href="/connexion" sx={{border: "solid 1px whitesmoke", borderRadius: "15px"}}>
                Connexion
              </Button>
              }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
