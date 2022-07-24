import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/joy/Chip";
import ChipDelete from "@mui/joy/ChipDelete";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TabsProfil() {
  let imgEmoji = "";
  const [currentHaiku, setCurrentHaiku] = useState(null);
  const [currentHaikuDel, setCurrentHaikuDel] = useState(null);

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

  const deleteHaiku = (id) => {
    fetch(`http://localhost:5000/haikus/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        getHaikus()
        handleClickAlertDelete()
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
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
        // handleClickAlert();
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = React.useState(false);

  const handleClickAlertDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseAlertDelete = (event, reason) => {
    
    if (reason === "clickaway") {
      return;
    }
    
    setOpenDelete(false);    
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
                return localStorage.getItem("userId") === haiku.user._id ? (
                  <div key={haiku._id} onClick={closeVote}>
                    <div className={currentHaiku ? "haikuDisplay" : ""}>
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
                        <ChipDelete
                          sx={{ position: "absolute", top: -15, right: -12 }}
                          color="danger"
                          variant="plain"
                          onClick={() => {
                            setCurrentHaikuDel(haiku);
                            handleClickOpen();
                          }}
                        >
                          <DeleteForever />
                        </ChipDelete>
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"SUPPRESSION !"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir supprimer cet Haiku ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Annuler</Button>
            <Button
              onClick={() => {
                deleteHaiku(currentHaikuDel._id);
                handleClose();
              }}
              autoFocus
            >
              Valider
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={openDelete} autoHideDuration={2000} onClose={handleCloseAlertDelete}>
        <Alert onClose={handleCloseAlertDelete} severity="success" sx={{ width: "100%" }}>
           Haiku supprimé !
        </Alert>
      </Snackbar>
    </>
  );
}
