import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getThemeProps, sizeHeight } from "@mui/system";
import { outlinedInputClasses } from "@mui/material";
import { STATES } from "mongoose";

///////////////////////////////////////////////////////////

export default function TabsHome() {

  const navigate = useNavigate();
  const haikuIdParam = useParams();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // ////////////////////////////////////////////////
  const [value, setValue] = useState("1");
  const [haikus, setHaikus] = useState([]);

  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  // récupération de tous les Haikus

  const getHaikus = () => {
    fetch("http://localhost:5000/haikus")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setHaikus(result);
        // console.log(result);
      })
      .catch((error) => console.log(error));
  };
  
  
  const [newReactions, setNewReactions] = useState({})

  const putHaiku = () => {

    let updateHaiku = {...newReactions};
    console.log(JSON.stringify(updateHaiku))
    // console.log(JSON.stringify(haikuIdParam.id)) 
    let haikuIdParamNumber = haikuIdParam.id 
    console.log(haikuIdParamNumber)
    fetch(`http://localhost:5000/haikus/${haikuIdParamNumber}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateHaiku),
        }
      )
        .then(() => {
          alert("Vos paramètres sont modifiés");
        })
        .catch((error) => {
          return;
        });
  }

  useEffect(() => {
    getHaikus();
  }, []);

  return (
    <Box sx={{ dp: 2, width: "100%", typography: "body1" }} className="margTop">
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 0, borderColor: "divider" }}
          display="flex"
          justifyContent="center"
        >
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab
              label="New"
              value="1"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              label="Top"
              value="2"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              label="Flow"
              value="3"
              sx={{ color: "whitesmoke !important" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          <div className="haikus">
            {haikus.map((haiku) => { 
              return (
                <>
                  <Paper
                    key={haiku._id}
                    elevation={8}
                    sx={{
                      padding: 2,
                      backgroundColor: "rgba(255,255,255,0)",
                      color: "whitesmoke",
                      width: "90%",
                    }}
                  >
                    <Avatar
                      key={haiku.user._id}
                      className="totemPosition"
                      sx={{ width: 70, height: 70 }}
                      src={haiku.user.totem}
                    />

                    <Typography sx={{ marginTop: -5 }}>
                      {haiku.line1}
                    </Typography>
                    <Typography>{haiku.line2}</Typography>
                    <Typography>{haiku.line3}</Typography>

                    {/* //////////////////////////////////////////////// */}
                    <div>
                    <img  
                        src={"/assets/emojis/flower_1.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          setNewReactions(haiku.reactions) 
                          navigate(`/${haiku._id}`)
                        }}
                      />

                      <img
                        src={"/assets/emojis/flower_1.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          let copy = {...newReactions,"flower_1": haiku.reactions[0].flower_1 + 1}
                          // console.log("iciiiiii  :" +copy)
                          setNewReactions(copy) 
                          putHaiku()
                          // handleClose();
                        }} 
                        
                      />

                      <img
                        src={"/assets/emojis/flower_2.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          setNewReactions({"flower_2": haiku.reactions[0].flower_2 + 1 })   
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/shell.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/shell.png" });
                          handleClose();
                        }}
                      />

                      <img
                        src={"/assets/emojis/star.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          //  updateForm({ emoji: "/assets/emojis/star.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/rainbow.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/rainbow.png" });
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
                          // updateForm({ emoji: "/assets/emojis/sun.png" });
                          handleClose();
                        }}
                      />
                     <p> {haiku.reactions[0].sun}</p>
                      <img
                        src={"/assets/emojis/snow.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/snow.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/trefle.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/trefle.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/water.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/water.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/tree.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          //  updateForm({ emoji: "/assets/emojis/tree.png" });
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
                          // updateForm({ emoji: "/assets/emojis/flower_rose.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/feuille_orange.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({
                          //   emoji: "/assets/emojis/feuille_orange.png",
                          // });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/fire.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          //  updateForm({ emoji: "/assets/emojis/fire.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/cloud.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/cloud.png" });
                          handleClose();
                        }}
                      />
                      <img
                        src={"/assets/emojis/sea.png"}
                        alt=""
                        className="emojiItem"
                        onClick={() => {
                          // updateForm({ emoji: "/assets/emojis/sea.png" });
                          handleClose();
                        }}
                      />
                    </div>
                  </Paper>
                </>
              );
            })}
          </div>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
