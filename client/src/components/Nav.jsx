/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import img from "../assets/img/logo-escapegame.png";


export default function ButtonAppBar() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{position:"fixed", bgcolor:"#6059bd"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/">
              <img src={img} className="logoImg"></img>{" "}
            </a>
          </Typography>
          {false ?
            <>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <p>Bonjour {}</p>
              </Typography>
              <Button color="error" href="/historique">
                Historique
              </Button>
              <Button color="inherit" >
                Déconnexion
              </Button>
            </>

            :  <Button color="inherit" href="/connexion">
                Connexion
              </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
