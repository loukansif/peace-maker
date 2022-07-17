import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

export default function Connexion() {
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let pass = data.get("password");
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    fetch(`http://localhost:5000/users/${email}`)
      .then((resp) => resp.json())
      .then((jresponse) => {
        if (jresponse === null) {
          alert("Erreur email ou mot de passe");
        } else if (pass === jresponse.password) {
          localStorage.setItem("userId", jresponse._id);
          localStorage.setItem("userLastName", jresponse.lastname);
          localStorage.setItem("userFirtsName", jresponse.firstname);
          localStorage.setItem("userEmail", jresponse.email);
          localStorage.setItem("userAdmin", jresponse.admin);
          localStorage.setItem("userTotem", jresponse.totem);
          localStorage.setItem("userPass", jresponse.password);
          localStorage.setItem("userIsLogged", true);
          navigate("/", { replace: true });
          window.location.reload();
        } else {
          alert("erreur email ou mot de passe");
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              color="whiteColor"
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              color="whiteColor"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: "white" }}>
                  Mot de passe oublié ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/inscription" variant="body2" sx={{ color: "white" }}>
                  {"Pas de compte ? Inscrivez-vous"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
