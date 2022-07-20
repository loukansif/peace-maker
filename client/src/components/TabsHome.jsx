import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function TabsHome() {
  const [currentHaiku, setCurrentHaiku] = useState(null);
  let imgEmoji = "";
  
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

  // récupération de tous les Haikus

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

  const emojisFunction = (haiku) => {
    setCurrentHaiku(haiku);
  };

  const updateVote = (index) => {
    currentHaiku.reactionss[index]++;
    updateReactions();
    closeVote();
  };

  const closeVote = () => {
    if (currentHaiku) {
      setCurrentHaiku(null);
    }
  };

  const updateReactions = () => {
    fetch(`http://localhost:5000/haikus/${currentHaiku._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reactionss: currentHaiku.reactionss }),
    })
      .then(() => {
        alert("Vote enregistré");
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  useEffect(() => {
    getHaikus();
  }, [setCurrentHaiku]);

  return (
    <Box sx={{ dp: 2, width: "100%", typography: "body1" }} className="margTop">
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 0, borderColor: "divider" }}
          display="flex"
          justifyContent="center"
          width="100%"
          position="fixed"
          top="6%"
          className="blur"
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
          {currentHaiku && (
            <div className="emojisSelect">
              {reactionsImg.map((i, index) => {
                return (
                  <span className="emojiContainer">
                    <img
                      src={reactionsImg[index]}
                      className="emojisSelectItem"
                      alt=""
                      onClick={() => updateVote(index)}
                    />
                    <span>{currentHaiku.reactionss[index]}</span>
                  </span>
                );
              })}
            </div>
          )}

          <div className="haikus">
            {haikus.map((haiku) => {
              let nbReaction = 0;
              for (let i = 0; i < haiku.reactionss.length; i++) {
                if (haiku.reactionss[i] > nbReaction) {
                  nbReaction = haiku.reactionss[i];
                  imgEmoji = reactionsImg[i];
                }
              }
              return (
                <>
                  <div
                    className={currentHaiku ? "haikuDisplay" : ""}
                    onClick={closeVote}
                  >
                    <Paper
                      key={haiku._id}
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

                      <Avatar
                        className="emojiPosition"
                        src={imgEmoji}
                        onClick={() => emojisFunction(haiku)}
                      />
                    </Paper>
                  </div>
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
