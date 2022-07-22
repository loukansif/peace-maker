import { Link } from "@mui/material";
import React from "react";
import "../FooterButtons.scss";

import NewHaikuButtonIcone from '../assets/icones/newHaikuButton.png'

export default function NewHaikuButton() {
    return(
        <>
        <div className="backgroundfooterButton">
            <div className="footerButtons">
                <div className="moodSelectionButton">
                    <Link href="/moodSelection" >
                        <p className="moodButtonIcone">mood</p>
                    </Link>
                </div>
                <div className="timeFilterSection">
                    <p className="filterButton" onClick={() => alert('24h filter') }> 24h </p>
                    <p className="filterButton" onClick={() => alert('all filter') }> all </p>
                </div>
                <div className="newHaikuButton">
                {localStorage.getItem("userId")
                ? 
                <a href="/newhaiku" >
                        <img src={NewHaikuButtonIcone} className="NewHaikuButtonIcone" alt="ecrire un nouvel haiku"></img>
                    </a>
                :
                <a href="/connexion" >
                        <img src={NewHaikuButtonIcone} className="NewHaikuButtonIcone" alt="ecrire un nouvel haiku"></img>
                    </a>
                }
                </div>
             </div>
        </div>
        </>
    );
}