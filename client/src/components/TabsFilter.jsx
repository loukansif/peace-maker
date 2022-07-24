import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import { useParams } from "react-router-dom";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

export default function TabsFilter() {
  const { userId } = useParams();
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

  const emojisFunction = (haiku) => {
    setCurrentHaiku(haiku);
  };

  const updateVote = (index) => {
    currentHaiku.reactionss[index]++;
    currentHaiku.totalVote++;
    updateReactions();
    closeVote();
  };

  const closeVote = () => {
    if (currentHaiku) {
      setCurrentHaiku(null);
    }
  };

  const updateReactions = () => {
    fetch(`https://haikuz.herokuapp.com/haikus/${currentHaiku._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reactionss: currentHaiku.reactionss,
        totalVote: currentHaiku.totalVote,
      }),
    })
      .then(() => {
        // handleClickAlert();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // récupération de tous mes Haikus

  const getHaikus = () => {
    fetch("https://haikuz.herokuapp.com/haikus")
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
    <>
      <div className="blurBackground"> </div>
      <Box
        sx={{ dp: 2, width: "100%", typography: "body1" }}
        className="margTop"
      >
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
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              style={{ top: 60, left: 0, marginTop: 26 }}
              TabIndicatorProps={{ style: { backgroundColor: "white" } }}
            >
              <Tab
                style={{ textTransform: "none", fontSize: 18 }}
                label="haïkus"
                value="1"
                sx={{ color: "whitesmoke !important" }}
              />
              <Tab
                style={{ textTransform: "none", fontSize: 18 }}
                label="favoris"
                value="2"
                sx={{ color: "whitesmoke !important" }}
              />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            style={{ top: 90, left: 0, marginLeft: 10, marginTop: 20 }}
          >
            {currentHaiku && (
              <div className="emojisSelect">
                {reactionsImg.map((i, index) => {
                  return (
                    <span className="emojiContainer" key={index}>
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
                return userId === haiku.user._id ? (
                  <div key={haiku._id}>
                    <div
                      className={currentHaiku ? "haikuDisplay" : ""}
                      onClick={closeVote}
                    >
                      <Paper
                        elevation={8}
                        sx={{
                          padding: 2,
                          backgroundColor: "rgba(0,0,0,0.2)",
                          color: "whitesmoke",
                          width: "90%",
                          marginBottom: 4,
                          borderRadius: "25px",
                          position: "relative",
                        }}
                      >
                        <Avatar
                          className="totemPosition"
                          sx={{ width: 70, height: 70 }}
                          src={haiku.user.totem}
                        />
                        <div className="textHaiku">
                          <Typography sx={{ marginTop: -9 }}>
                            {haiku.line1}
                          </Typography>
                          <Typography>{haiku.line2}</Typography>
                          <Typography>{haiku.line3}</Typography>
                        </div>

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
    </>
  );
}
