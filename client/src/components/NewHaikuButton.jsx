import { Link } from "@mui/material";
import React from "react";
import "../FooterButtons.scss";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import NewHaikuButtonIcone from "../assets/icones/newHaikuButton.png";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function NewHaikuButton() {
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
  return (
    <>
      <div className="backgroundfooterButton">
        <div className="footerButtons">
          <div className="moodSelectionButton">
            <Link onClick={handleClickAlert}>
              <p className="moodButtonIcone">mood</p>
            </Link>
          </div>
          <div className="timeFilterSection">
            <p className="filterButton" onClick={handleClickAlert}>
              {" "}
              24h{" "}
            </p>
            <p className="filterButton" onClick={handleClickAlert}>
              {" "}
              all{" "}
            </p>
          </div>
          <div className="newHaikuButton">
            {localStorage.getItem("userId") ? (
              <a href="/newhaiku">
                <img
                  src={NewHaikuButtonIcone}
                  className="NewHaikuButtonIcone"
                  alt="ecrire un nouvel haiku"
                ></img>
              </a>
            ) : (
              <a href="/connexion">
                <img
                  src={NewHaikuButtonIcone}
                  className="NewHaikuButtonIcone"
                  alt="ecrire un nouvel haiku"
                ></img>
              </a>
            )}
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert
          onClose={handleCloseAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          En construction !
        </Alert>
      </Snackbar>
    </>
  );
}
