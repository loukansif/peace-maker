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

export default function FormNewHaiku() {
  const [haiku_Line_1_Length, sethaiku_Line_1_Length] = useState(0);
  const [haiku_Line_2_Length, sethaiku_Line_2_Length] = useState(0);
  const [haiku_Line_3_Length, sethaiku_Line_3_Length] = useState(0);

  let counterspaceDefault = (
    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
  );

  
  ///////////////////// HANDLE CHANGE TODO: NOT WORKING => target.value.length OK , target.value NOT OK /////////////////////////////////////
  const [haikuLine1, setHaikuLine1] = useState("");
  const [haikuLine2, setHaikuLine2] = useState("");
  const [haikuLine3, setHaikuLine3] = useState("");

  const handleChangeLine1 = (e) => {
    sethaiku_Line_1_Length(30 - e.target.value.length);
    setHaikuLine1(e.target.value);
    setNewHaiku({ text: {fullNewHaiku} })
  };

  const handleChangeLine2 = (e) => {
    sethaiku_Line_2_Length(30 - e.target.value.length);
    setHaikuLine2(e.target.value);
    setNewHaiku({ text: {fullNewHaiku} })
  };

  const handleChangeLine3 = (e) => {
    sethaiku_Line_3_Length(30 - e.target.value.length);
    setHaikuLine3(e.target.value);
    setNewHaiku({ text: {fullNewHaiku} })
  };

    let fullNewHaiku = ` ${haikuLine1} //n ${haikuLine2} //n ${haikuLine3} `;

  ///////////////////////////// POST NEW HAIKU TODO: FETCH NOT WORKING => Post Bad Request ///////////////////////////////////////

  const [newHaiku, setNewHaiku] = useState({
    userID: "",
    text: "",
    emoji: "",
    createdAt: "",
  });

  const postNewHaiku = (event) => {
      //// MISE A JOUR DU FULL HAIKU (HAIKU COMPLET) ////
    
    fetch("http://localhost:5000/haikus/", {
        method: "POST",
       HEADERS: {
       "CONTENT-TYPE": "APPLICATION/JSON",
        },
            body: JSON.stringify(newHaiku),
        })
        .then(() => {
            alert("haiku enregistré");
            console.log(fullNewHaiku);
      })
      .catch((error) => {
        alert(error);
        return;
    });
  };

  /////////////////////////////////////////////// set state mood Emoji /////////////////////////////////////////////
  const [moodEmoji, setMoodEmoji] = React.useState("");

  const handleChange = (event) => {
    setMoodEmoji(event.target.value);
  };

  /////////////////////////////////////////////// LIST EMOJI MOOD  ////////////////////////////////////

  //:TODO: Importer les Emoji Mood et les affiché comme sur la page des Totem
  // TODO: recuperer la valeur de l'emoji choisie
  // TODO: afficher l'emoji choisie à coter du choix
  //

  /////////////////////////////////////////////// List Emoji Mood States and Const ////////////////////////////////////
  const [emojiMood, setEmojiMood] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChangeEmojiList = (event) => {
    setEmojiMood(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
            <Link to="/validationNewHaiku">
              {/* TODO: Créer la route " validationNewHaiku " => 8 secondes OR onClick = back to /Home ou Profil */}
              <Button
                color="inherit"
                sx={{ border: "solid 1px whitesmoke", borderRadius: "15px" }}
                onClick={() => {
                  postNewHaiku();
                  
                }}
              >
                partager
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="newHaikuSection">
        {/* // Formulaire d'écriture du Haiku  */}
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
          <div className="textAndCounterFormNewHaiku">
            <div className="textFormNewHaiku">
              <Typography
                className="titleFormHaiku"
                variant="h8"
                component="h5"
                justify="flex-start"
              >
                nouvel Haïku
              </Typography>
              <div className="newHaikuLine">
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={handleChangeLine1}
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={handleChangeLine2}
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={handleChangeLine3}
                />
              </div>
            </div>

            {/* ///////////////////////////// les 3 compteurs de lettres //////////////////////////////// */}
            <div className="LineCounterFormNewHaiku">
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_1_Length === 0 || haiku_Line_1_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_1_Length}{" "}
              </div>
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_2_Length === 0 || haiku_Line_2_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_2_Length}{" "}
              </div>
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_3_Length === 0 || haiku_Line_3_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_3_Length}{" "}
              </div>
            </div>
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
          <div className="selectEmojiMood">
            <Button
              sx={{ display: "block", minWidth: 100 }}
              onClick={handleOpen}
            >
              <p>choisir son mood</p>
            </Button>
            <FormControl sx={{ minWidth: 100 }}>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={emojiMood}
                label="Age"
                onChange={handleChangeEmojiList}
              >
                <MenuItem value=""> </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Box>
      </div>
    </>
  );
}
