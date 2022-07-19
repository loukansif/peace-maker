
import React from "react";
import Link from "@mui/material/Link"; 
import NewHaikuButtonIcone from '../assets/icones/newHaikuButton.png'

export default function NewHaikuButton() {
    return(
        <div className="newHaikuButton">
        {/* Condition de connexion => connexion OK */}
        {localStorage.getItem("userId")
        ? 
            <a href="/newhaiku" >
                <img src={NewHaikuButtonIcone} className="NewHaikuButtonIcone"></img>
            </a>
        :
            <a href="/connexion" >
                <img src={NewHaikuButtonIcone} className="NewHaikuButtonIcone"></img>
            </a>
        }
        {/* Condition de connexion => ERROR */}
        </div>
    );
}