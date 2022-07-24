import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme({
  palette: {
    whiteColor: {
      main: '#fff',
      contrastText: '#fff',
    },
  },
});

export default function Inscription() {
  let navigate = useNavigate();
  const [form, setForm] = useState({
    admin: false,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    totem: "/assets/totem/abeille.png",
    following:[]
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let password = data.get("password");
    let passwordControl = data.get("passwordControl");

    if (password === passwordControl) {
      let newUser = { ...form };
      fetch("https://haikuz.herokuapp.com/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      })
        .then(() => {
          handleClickAlert();
        })
        .catch((error) => {
          window.alert(error);
          return;
        });
      setForm({});
    } else {
      alert("les mots de passe ne sont pas identiques");
    }
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
    navigate("/connexion", { replace: true });
  };

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar
          sx={{
            position: "fixed",
            bgcolor: "rgba(255,255,255,0)",
            color: "whitesmoke",
          }}
          elevation={0}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <ArrowBackIosNewIcon onClick={() => navigate(-1)}/>
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>
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
            <Typography component="h1" variant="h5">
              Inscription
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {false ? (
                  <Grid item xs={12}>
                    <TextField
                      color="white"
                      required
                      fullWidth
                      id="admin"
                      label="Admin"
                      name="admin"
                      onChange={(e) => updateForm({ admin: e.target.value })}
                    />
                  </Grid>
                ) : null}
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Prénom"
                    variant="standard"
                    onChange={(e) => updateForm({ firstname: e.target.value })}
                    autoFocus
                    color="whiteColor"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Nom"
                    name="lastName"
                    variant="standard"
                    onChange={(e) => updateForm({ lastname: e.target.value })}
                    autoComplete="family-name"
                    color="whiteColor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    variant="standard"
                    onChange={(e) => updateForm({ email: e.target.value })}
                    autoComplete="email"
                    color="whiteColor"
                  />
                </Grid>
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: "100%" }}>
           Vous êtes enregistré!
        </Alert>
      </Snackbar>
    </div>
    
    </>
  );
}
