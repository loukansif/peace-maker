import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TabsHome() {
  const [userFollowing, setUserFollowing] = useState([]);
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
  const [haikusByVote, setHaikusByVote] = useState([]);

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

  // récupérations des Haikus triés par top vote

  const getHaikusByVote = () => {
    fetch("http://localhost:5000/haikus/top")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setHaikusByVote(result);
      })
      .catch((error) => console.log(error));
  };

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
    fetch(`http://localhost:5000/haikus/${currentHaiku._id}`, {
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
        handleClickAlert();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const getConnectUserById = () => {
    if (!localStorage.getItem("userId")) {
      return;
    }
    fetch(`http://localhost:5000/users/user/${localStorage.getItem("userId")}`)
      .then((resp) => resp.json())
      .then((res) => {
        setUserFollowing(res.following);
      });
  };

  const favoriteFunc = (fav) => {
    fav.favorite.push(localStorage.getItem("userId"));
    fetch(`http://localhost:5000/haikus/${fav._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: fav.favorite }),
    })
      .then(() => {
        getHaikus();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const unfavoriteFunc = (fav) => {
    fav.favorite.splice(
      fav.favorite.indexOf(localStorage.getItem("userId")),
      1
    );
    fetch(`http://localhost:5000/haikus/${fav._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ favorite: fav.favorite }),
    })
      .then(() => {
        getHaikus();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
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
  };

  useEffect(() => {
    getHaikus();
    getHaikusByVote();
    getConnectUserById();
  }, []);

  return (
    <Box sx={{ dp: 2, width: "100%", typography: "body1" }} className="margTop">
      <TabContext value={value}>
        <Box
          sx={{ borderBottom: 0, borderColor: "divider" }}
          display="flex"
          justifyContent="center"
          width="100%"
          position="fixed"
          top="8%"
          className="blur"
        >
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            style={{ top: 60, left: 0, marginTop: 18 }}
            TabIndicatorProps={{ style: { backgroundColor: "white" } }}
          >
            <Tab
              style={{ textTransform: "none", fontSize: 18 }}
              label="new"
              value="1"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              style={{ textTransform: "none", fontSize: 18 }}
              label="top"
              value="2"
              sx={{ color: "whitesmoke !important" }}
            />
            <Tab
              style={{ textTransform: "none", fontSize: 18 }}
              label="flow"
              value="3"
              sx={{ color: "whitesmoke !important" }}
            />
          </TabList>
        </Box>
        <TabPanel value="1" style={{ top: 60, left: 0, marginLeft: 10 }}>
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
              return (
                <div
                  className={currentHaiku ? "haikuDisplay" : ""}
                  onClick={closeVote}
                  key={haiku._id}
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
                    <a
                      href={
                        haiku.user._id === localStorage.getItem("userId")
                          ? "/profil"
                          : "/profil/" + haiku.user._id
                      }
                    >
                      <Avatar
                        key={haiku.user._id}
                        className="totemPosition"
                        sx={{ width: 70, height: 70 }}
                        src={haiku.user.totem}
                      />
                    </a>
                    <div className="textHaiku">
                      <Typography sx={{ marginTop: -9 }}>
                        {haiku.line1}
                      </Typography>
                      <Typography>{haiku.line2}</Typography>
                      <Typography>{haiku.line3}</Typography>
                    </div>
                    {localStorage.getItem("userIsLogged") && (
                      <div className="favoritePosition">
                        {haiku.favorite.includes(
                          localStorage.getItem("userId")
                        ) ? (
                          <FavoriteIcon onClick={() => unfavoriteFunc(haiku)} />
                        ) : (
                          <FavoriteBorderIcon
                            onClick={() => favoriteFunc(haiku)}
                          />
                        )}
                      </div>
                    )}
                    <Avatar
                      className="emojiPosition"
                      src={imgEmoji}
                      onClick={() => emojisFunction(haiku)}
                    />
                  </Paper>
                </div>
              );
            })}
          </div>
          <div className="tabEmptySpace">
            <p className="loadMoreHaikusIcone"> load more </p>
          </div>
        </TabPanel>
        <TabPanel value="2" style={{ top: 60, left: 0, marginLeft: 10 }}>
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
            {haikusByVote.map((haiku) => {
              let nbReaction = 0;
              for (let i = 0; i < haiku.reactionss.length; i++) {
                if (haiku.reactionss[i] > nbReaction) {
                  nbReaction = haiku.reactionss[i];
                  imgEmoji = reactionsImg[i];
                }
              }
              return (
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
                      <a
                        href={
                          haiku.user._id === localStorage.getItem("userId")
                            ? "/profil"
                            : "/profil/" + haiku.user._id
                        }
                      >
                        <Avatar
                          key={haiku.user._id}
                          className="totemPosition"
                          sx={{ width: 70, height: 70 }}
                          src={haiku.user.totem}
                        />
                      </a>
                      <div className="textHaiku">
                        <Typography sx={{ marginTop: -9 }}>
                          {haiku.line1}
                        </Typography>
                        <Typography>{haiku.line2}</Typography>
                        <Typography>{haiku.line3}</Typography>
                      </div>
                      {localStorage.getItem("userIsLogged") && (
                        <div className="favoritePosition">
                          {haiku.favorite.includes(
                            localStorage.getItem("userId")
                          ) ? (
                            <FavoriteIcon
                              onClick={() => unfavoriteFunc(haiku)}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              onClick={() => favoriteFunc(haiku)}
                            />
                          )}
                        </div>
                      )}
                      <Avatar
                        className="emojiPosition"
                        src={imgEmoji}
                        onClick={() => emojisFunction(haiku)}
                      />
                    </Paper>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="tabEmptySpace">
            <p className="loadMoreHaikusIcone"> load more </p>
          </div>
        </TabPanel>
        <TabPanel
          value="3"
          style={{ top: 60, left: 0, marginLeft: 10, color: "white" }}
        >
          {localStorage.getItem("userIsLogged") ? (
            userFollowing.length > 0 ? (
              <>
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
                    return userFollowing.includes(haiku.user._id) ? (
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
                            <a
                              href={
                                haiku.user._id ===
                                localStorage.getItem("userId")
                                  ? "/profil"
                                  : "/profil/" + haiku.user._id
                              }
                            >
                              <Avatar
                                key={haiku.user._id}
                                className="totemPosition"
                                sx={{ width: 70, height: 70 }}
                                src={haiku.user.totem}
                              />
                            </a>
                            <div className="textHaiku">
                              <Typography sx={{ marginTop: -9 }}>
                                {haiku.line1}
                              </Typography>
                              <Typography>{haiku.line2}</Typography>
                              <Typography>{haiku.line3}</Typography>
                            </div>
                            {localStorage.getItem("userIsLogged") && (
                              <div className="favoritePosition">
                                {haiku.favorite.includes(
                                  localStorage.getItem("userId")
                                ) ? (
                                  <FavoriteIcon
                                    onClick={() => unfavoriteFunc(haiku)}
                                  />
                                ) : (
                                  <FavoriteBorderIcon
                                    onClick={() => favoriteFunc(haiku)}
                                  />
                                )}
                              </div>
                            )}
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
              </>
            ) : (
              "Vous ne suivez aucune personne!"
            )
          ) : (
            "Veuillez vous identifier!"
          )}
        </TabPanel>
      </TabContext>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Vote enregistré!
        </Alert>
      </Snackbar>
    </Box>
  );
}
