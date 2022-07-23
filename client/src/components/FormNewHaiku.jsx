import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import FormData from "form-data";
import axios from "axios";
import "../formHaiku.scss";
import mongoose from "mongoose";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FormNewHaiku() {
  let reactionsImg = [
    "/assets/emojis/cloud.png",
    "/assets/emojis/feuille_orange.png",
    "/assets/emojis/fire.png",
    "/assets/emojis/flower_1.png",
    "/assets/emojis/flower_2.png",
    "/assets/emojis/flower_rose.png",
    "/assets/emojis/rainbow.png",
    "/assets/emojis/sea.png",
    "/assets/emojis/shell.png",
    "/assets/emojis/snow.png",
    "/assets/emojis/star.png",
    "/assets/emojis/sun.png",
    "/assets/emojis/tree.png",
    "/assets/emojis/trefle.png",
    "/assets/emojis/water.png",
  ];
  const navigate = useNavigate();

  const [emojisList, setEmojisList] = useState(false);

  const [haiku_Line_1_Length, sethaiku_Line_1_Length] = useState(0);
  const [haiku_Line_2_Length, sethaiku_Line_2_Length] = useState(0);
  const [haiku_Line_3_Length, sethaiku_Line_3_Length] = useState(0);
  const userId = localStorage.getItem("userId");

  const [form, setForm] = useState({
    user: mongoose.Types.ObjectId(userId),
    line1: "",
    line2: "",
    line3: "",
    createdAt: "",
    reactionss: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  // modération /////////////////////////////////////////
  function sightEngine() {
    let data = new FormData();
    data.append("text", form.line1 + form.line2 + form.line3);
    data.append("lang", "fr");
    data.append("mode", "standard");
    data.append("api_user", "323671425");
    data.append("api_secret", "vGeWd6t4TaMFxVYL5JtB");

    // fetch sightEngine
    axios({
      url: "https://api.sightengine.com/1.0/text/check.json",
      method: "post",
      data: data,
      headers: data.getHeaders
        ? data.getHeaders()
        : { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // on success: handle response
        console.log(response.data.profanity.matches.length);
        if (response.data.profanity.matches.length !== 0) {
          handleClickAlert();
        }
      })
      .catch(function (error) {
        // handle error
        if (error.response) console.log(error.response.data);
        else console.log(error.message);
      });
  }

  // fin modération /////////////////////////////

  function updateForm(value) {
    console.log(value);
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  let counterspaceDefault = <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>;

  ///////////////////////////// POST NEW HAIKU  ///////////////////////////////////////

  const postNewHaiku = () => {
    //// MISE A JOUR DU FULL HAIKU (HAIKU COMPLET) ////
    let newHaiku = { ...form };

    fetch("http://localhost:5000/haikus/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newHaiku),
    })
      .then(() => {
        handleClickAlertCreate();
      })
      .catch((error) => {
        alert(error);
        return;
      });
  };

  const handleClose = () => {
    setEmojisList(!emojisList);
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
    window.location.reload();
  };

  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickAlertCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseAlertCreate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCreate(false);
    navigate("/");
  };

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
          <div className="navProfil">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
              </Typography>
              <Button
                              className="btnFollow"

                color="inherit"
                style={{ textTransform: "none" }}
                sx={{ border: "solid 1px whitesmoke", borderRadius: "18px", pl:2, pr:2 }}
                onClick={() => {
                  postNewHaiku();
                }}
              >
                partager
              </Button>
            </Toolbar>
          </div>
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
                sx={{ color: "whitesmoke", marginBottom: 2 }}
              >
                nouvel Haïku
              </Typography>
              <div className="newHaikuLine">
                <TextField
                isRequired="true"
                 sx={{ input: { color: 'white' } }}
                  inputProps={{ maxLength: 30  }}
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    updateForm({
                      line1: e.target.value,
                      createdAt: new Date(),
                    });
                    sethaiku_Line_1_Length(30 - e.target.value.length);
                  }}
                  onBlur={sightEngine}
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                sx={{ input: { color: 'white' } }}
                  inputProps={{ maxLength: 30 }}
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    updateForm({ line2: e.target.value });
                    sethaiku_Line_2_Length(30 - e.target.value.length);
                  }}
                  onBlur={sightEngine}
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                                 sx={{ input: { color: 'white' } }}
                  inputProps={{ maxLength: 30 }}
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    updateForm({ line3: e.target.value });
                    sethaiku_Line_3_Length(30 - e.target.value.length);
                  }}
                  onBlur={sightEngine}
                />
              </div>
            </div>

            {/* ///////////////////////////// les 3 compteurs de lettres //////////////////////////////// */}
            <div className="LineCounterFormNewHaiku">
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_1_Length === 0 || haiku_Line_1_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_1_Length}
              </div>
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_2_Length === 0 || haiku_Line_2_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_2_Length}
              </div>
              <div className="haikuLineLengthCount">
                {" "}
                {haiku_Line_3_Length === 0 || haiku_Line_3_Length === 30
                  ? counterspaceDefault
                  : haiku_Line_3_Length}
              </div>
            </div>
          </div>
        </Box>

        {/* ////////////////////////////  Slider pour selectionner l'emoji du mood   ///////////////////// */}
        <Button sx={{ display: "block", minWidth: 100 }}>
          <div className="selectEmojiTitle">
            <span
              onClick={() => {
                handleClose();
              }}
            >
              {" "}
              choisir son mood{" "}
            </span>
          </div>
          <div>
            <img
              src={reactionsImg[form.reactionss.indexOf(1)]}
              alt=""
              className="totemSelected"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
        </Button>
        {emojisList && (
          <div className="emojisSelect">
            {reactionsImg.map((i, index) => {
              let reactionSelect = Array.from({ length: 15 }, (x) => 0);
              reactionSelect[index]++;
              return (
                <span className="emojiContainer" key={index}>
                  <img
                    src={reactionsImg[index]}
                    className="emojisSelectItem"
                    alt=""
                    onClick={() => {
                      updateForm({ reactionss: reactionSelect, totalVote: 1 });
                      handleClose();
                    }}
                  />
                </span>
              );
            })}
          </div>
        )}
        <Box
          component="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", mt: 2 }}
        ></Box>

        {/* //////////////////////////////// Texte Règles écriture d'un Haiku //////////////////////////// */}
        <div className="ReglesHaiku">
          <ul>
            <h5>les règles d'un Haiku:</h5>
            <li> 3 lignes </li>
            <li> 30 caractères par ligne </li>
            <li> laisser libre court à son imagination </li>
          </ul>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Pas de gros mots!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openCreate}
        autoHideDuration={2000}
        onClose={handleCloseAlertCreate}
      >
        <Alert
          onClose={handleCloseAlertCreate}
          severity="success"
          sx={{ width: "100%" }}
        >
          Haiku enregistré!
        </Alert>
      </Snackbar>
    </>
  );
}
