import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Inscription() {
    let navigate = useNavigate();
    const [form, setForm] = useState({
      admin: false,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      totem: "/assets/totem/abeille.png",
    });
  
    function updateForm(value) {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }
 
    return (
        <Grid item xs={12} className="totemItems">
        <div>
          <p>Veuillez choisir votre Totem</p>
          <img src={form.totem} alt="" className="totemSelected" />
        </div>
        <div>
          <img
            src={"/assets/totem/abeille.png"}
            alt=""
            className="totemItem"
            onClick={() => {
              updateForm({ totem: "/assets/totem/abeille.png" });
            }}
          />
          <img
            src={"/assets/totem/butterfly.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/butterfly.png" })
            }
          />
          <img
            src={"/assets/totem/chenille.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/chenille.png" })
            }
          />
          <img
            src={"/assets/totem/coccinelle.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/coccinelle.png" })
            }
          />
          <img
            src={"/assets/totem/crabe.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/crabe.png" })
            }
          />
        </div>
        <div>
          <img
            src={"/assets/totem/dauphin.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/dauphin.png" })
            }
          />
          <img
            src={"/assets/totem/dragon.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/dragon.png" })
            }
          />
          <img
            src={"/assets/totem/ecureuil.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/ecureuil.png" })
            }
          />
          <img
            src={"/assets/totem/elephant.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/elephant.png" })
            }
          />
          <img
            src={"/assets/totem/lapin.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/lapin.png" })
            }
          />
        </div>
        <div>
          <img
            src={"/assets/totem/oiseau.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/oiseau.png" })
            }
          />
          <img
            src={"/assets/totem/pingouin.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/pingouin.png" })
            }
          />
          <img
            src={"/assets/totem/snail.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/snail.png" })
            }
          />
          <img
            src={"/assets/totem/souris.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/souris.png" })
            }
          />
          <img
            src={"/assets/totem/tortue.png"}
            alt=""
            className="totemItem"
            onClick={() =>
              updateForm({ totem: "/assets/totem/tortue.png" })
            }
          />
        </div>
      </Grid>
    )
  
}  