
import React from "react";
import NewHaikuButtonIcone from '../assets/icones/newHaikuButton.png'

export default function NewHaikuButton() {
    return(
        <div className="newHaikuButton">
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
        </div>
    );
}