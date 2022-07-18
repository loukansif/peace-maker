import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@mui/material/Input";

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
import Grid from "@mui/material/Grid";

import backIcone from "../assets/icones/backArrow.png";

import "../formHaiku.scss";

export default function FormNewHaiku() {
  const navigate = useNavigate();

  const [haikuLine1, setHaikuLine1] = useState("");
  const [haikuLine2, setHaikuLine2] = useState("");
  const [haikuLine3, setHaikuLine3] = useState("");

  const [haiku_Line_1_Length, sethaiku_Line_1_Length] = useState(0);
  const [haiku_Line_2_Length, sethaiku_Line_2_Length] = useState(0);
  const [haiku_Line_3_Length, sethaiku_Line_3_Length] = useState(0);

  const [form, setForm] = useState({
    userId: localStorage.getItem("email"),
    line1: "",
    line2: "",
    line3: "",
    emoji: "",
    createdAt: "",
  });

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
        alert("haiku enregistré");
        console.log(newHaiku);
      })
      .catch((error) => {
        alert(error);
        return;
      });
  };

  const [open, setOpen] = React.useState(false);
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
            <Button
              color="inherit"
              sx={{ border: "solid 1px whitesmoke", borderRadius: "15px" }}
              onClick={() => {
                postNewHaiku();
                navigate("/validationNewHaiku");
              }}
            >
              partager
            </Button>
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
                  inputProps={{ maxLength: 30 }}
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
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                  inputProps={{ maxLength: 30 }}
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    updateForm({ line2: e.target.value });
                    sethaiku_Line_2_Length(30 - e.target.value.length);
                  }}
                />
              </div>
              <div className="newHaikuLine">
                <TextField
                  inputProps={{ maxLength: 30 }}
                  style={{ width: "100%" }}
                  id="standard-basic"
                  variant="standard"
                  // onChange={handleChangeLine1}
                  onChange={(e) => {
                    updateForm({ line3: e.target.value });
                    sethaiku_Line_3_Length(30 - e.target.value.length);
                  }}
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
              <div className="selectEmojiTitle">
                <p> choisir son mood </p>
                <img src={form.emoji} alt="" className="emojiSelected" />
              </div>
            </Button>
            <FormControl sx={{ minWidth: 100 }}>
              <Select
                sx={{ backgroundColor: "transparent" }}
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                // value={emojiMood}
                label="Emoji"
              >
                <Grid
                  item
                  xs={12}
                  className="emojiItems"
                  sx={{ backgroundColor: "transparent" }}
                >
                  <div>{/* <p>Veuillez choisir votre emoji</p> */}</div>
                  <div>
                    <img
                      src={"/assets/emojis/flower_1.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/flower_1.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/flower_2.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/flower_2.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/shell.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/shell.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/star.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/star.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/rainbow.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/rainbow.png" });
                        handleClose();
                      }}
                    />
                  </div>
                  <div>
                    <img
                      src={"/assets/emojis/sun.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/sun.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/snow.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/snow.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/trefle.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/trefle.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/water.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/water.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/tree.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/tree.png" });
                        handleClose();
                      }}
                    />
                  </div>
                  <div>
                    <img
                      src={"/assets/emojis/flower_rose.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/flower_rose.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/feuille_orange.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({
                          emoji: "/assets/emojis/feuille_orange.png",
                        });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/fire.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/fire.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/cloud.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/cloud.png" });
                        handleClose();
                      }}
                    />
                    <img
                      src={"/assets/emojis/sea.png"}
                      alt=""
                      className="emojiItem"
                      onClick={() => {
                        updateForm({ emoji: "/assets/emojis/sea.png" });
                        handleClose();
                      }}
                    />
                  </div>
                </Grid>
              </Select>
            </FormControl>
          </div>
        </Box>

        {/* //////////////////////////////// Texte Règles écriture d'un Haiku //////////////////////////// */}
        <div className="ReglesHaiku">
          <ol>
            <h5>les règles du Haiku:</h5>
            <li> 3 lignes </li>
            <li> 30 caractères par ligne </li>
          </ol>
        </div>
      </div>
    </>

  );
}

// const handleChangeLine2 = (e) => {
// sethaiku_Line_2_Length(30 - e.target.value.length);
//   setHaikuLine2(e.target.value);
//   setNewHaiku({ text: {fullNewHaiku} })
// };

// const handleChangeLine3 = (e) => {
//   sethaiku_Line_3_Length(30 - e.target.value.length);
//   setHaikuLine3(e.target.value);
//   setNewHaiku({ text: {fullNewHaiku} })
// };
