import React, { useState } from "react";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import backIcone from "../assets/icones/backArrow.png";

import "../formHaiku.scss";

export default function ValidationNewHaiku() {


  ///////////////////////////// POST NEW HAIKU  ///////////////////////////////////////
const [haiku, setHaiku] = useState([])


 
  const GetLastHaiku = () => {
      //// MISE A JOUR DU FULL HAIKU (HAIKU COMPLET) ////
      const getHaikus = () => {
        fetch("http://localhost:5000/haikus/")
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                setHaiku(result);
            })
            .catch((error) => console.log(error));
    };
  };


  /////////////////////////////////////////////// LIST EMOJI MOOD  ////////////////////////////////////



  //////////////////////////////////////////////////////  JSX RETURN ////////////////////////////////////////

  return (
    <>
      {/* /////////////////////////////////// NAV BAR SECTION NEW HAIKU ///////////////////////////////////////// */}

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
                <img
                  src={backIcone}
                  className="backIcone"
                  alt="fleche-retour"
                ></img>
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="lastHaikuSection">
        <Box
          component="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%" }}
          noValidate
          autoComplete="off"
        >
          {/* //////////////////////////////////  les 3 lignes à remplir par l'auteur ///////////////////////////// */}
          <div className="lastHaiku">
            
          </div>
        </Box>

        {/* ////////////////////////////  Slider pour selectionner l'emoji du mood   ///////////////////// */}
        <Box
          component="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", mt: 2 }}
        >
          <div className="messageLastHaiku">
            <h5> Envoyé </h5>
            <div>
             {haiku}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
