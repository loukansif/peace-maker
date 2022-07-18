import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    whiteColor: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

export default function Settings() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    password: localStorage.getItem("userPass"),
    totem: localStorage.getItem("userTotem"),
  });

  useEffect(() => {
    localStorage.setItem("userTotem", form.totem);
  }, [form]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const deconnect = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let password = data.get("password");
    let passwordControl = data.get("passwordControl");

    if (
      password === passwordControl ||
      form.totem !== localStorage.getItem("userTotem")
    ) {
      let updateUser = { ...form };

      fetch(
        `http://localhost:5000/users/${localStorage.getItem("userEmail")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateUser),
        }
      )
        .then(() => {
          alert("Vos paramètres sont modifiés");
          navigate("/", { replace: true });
          window.location.reload();
        })
        .catch((error) => {
          window.alert(error);
          return;
        });
    } else {
      alert("les mots de passe ne sont pas identiques");
    }
  };

  return (
    <div className="main">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  variant="standard"
                  onChange={(e) => updateForm({ password: e.target.value })}
                  autoComplete="new-password"
                  color="whiteColor"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordControl"
                  label="Confirmer votre mot de passe"
                  type="password"
                  id="passwordControl"
                  autoComplete="new-password"
                  variant="standard"
                  color="whiteColor"
                />
              </Grid>
              <Grid item xs={12} className="totemItems">
                <div>
                  <p>Changer votre totem</p>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Modifier
              </Button>
            </Box>
            <Button
              onClick={deconnect}
              fullWidth
              variant="contained"
              sx={{ bgcolor: "red", mt: 3, mb: 2 }}
            >
              Se déconnecter
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
