import React from "react";
import { useNavigate } from "react-router-dom";
import TabsProfil from "./TabsProfil.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import imgSettings from "../assets/img/settings.svg";
import NewHaikuButton from "./NewHaikuButton.jsx";

export default function Profil() {
    let navigate = useNavigate();

    return (
        <>
              <div className="blurBackgroundProfil"> </div>
            <Box sx={{ flexGrow: 1 }} mb={-2}>
                <AppBar
                    sx={{
                        position: "fixed",
                        bgcolor: "rgba(255,255,255,0)",
                        color: "whitesmoke",
                        height: 36 
                    }}
                    elevation={0}
                >
                    <div >
                    <Toolbar >
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                            <ArrowBackIosNewIcon onClick={() => navigate(-1)} />
                        </Typography>
                        <a href="/parametres">
                            <img src={imgSettings} className="settingsLogo" />
                        </a>
                        <div className="navUserTotem">
                            <a href="/profil">
                                <img
                                    src={`${localStorage.getItem("userTotem")}`}
                                    className="navUserImg"
                                />
                            </a>
                        </div>
                    </Toolbar>
                    </div>
                </AppBar>
            </Box>

            <div className="main">
                <TabsProfil />
                <NewHaikuButton />
            </div>
        </>

    );
}