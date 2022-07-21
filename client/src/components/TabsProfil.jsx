import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function TabsProfil() {
  let imgEmoji = "";
  const [currentHaiku, setCurrentHaiku] = useState(null);
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
  const [value, setValue] = useState("1");
  const [haikus, setHaikus] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const emojisFunction = (haiku) => {
    setCurrentHaiku(haiku);
  };

  // récupération de tous mes Haikus

  const getHaikus = () => {
    fetch("http://localhost:5000/haikus")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setHaikus(result);
      })
      .catch((error) => console.log(error));
  };

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
              label="Haïkus"
              value="1"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              label="Favoris"
              value="2"
              sx={{ color: "whitesmoke !important" }}
            />
          </TabList>
        </Box>

        <TabPanel value="1">
          <div className="haikus">
            {haikus.map((haiku) => {
              let nbReaction = 0;
              for (let i = 0; i < haiku.reactionss.length; i++) {
                if (haiku.reactionss[i] > nbReaction) {
                  nbReaction = haiku.reactionss[i];
                  imgEmoji = reactionsImg[i];
                }
              }
              return localStorage.getItem("userId") === haiku.user._id ? (
                  <div key={haiku._id}>
                    <div className={currentHaiku ? "haikuDisplay" : ""}>
                      <Paper
                        elevation={8}
                        sx={{
                          padding: 2,
                          backgroundColor: "rgba(255,255,255,0)",
                          color: "whitesmoke",
                          width: "90%",
                          marginBottom: 4,
                        }}
                      >
                        <Avatar
                          className="totemPosition"
                          sx={{ width: 70, height: 70 }}
                          src={haiku.user.totem}
                        />

                        <Typography sx={{ marginTop: -5 }}>
                          {haiku.line1}
                        </Typography>
                        <Typography>{haiku.line2}</Typography>
                        <Typography>{haiku.line3}</Typography>

                        <Avatar
                          className="emojiPosition"
                          src={imgEmoji}
                          onClick={() => emojisFunction(haiku)}
                        />
                      </Paper>
                    </div>
                  </div>
              ) : null;
            })}
          </div>
        </TabPanel>

        <TabPanel value="2">My favoris</TabPanel>
      </TabContext>
    </Box>
  );
}
