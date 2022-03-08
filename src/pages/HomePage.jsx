import { useState } from "react";
import "./HomePage.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import logo from "./img/logo.png";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function HomePage() {
  const [selection, setSelection] = useState(true);
  const theme = createTheme({
    palette: {
      primary: {
        light: "#fafafa",
        main: "#fafafa",
        dark: "#fafafa",
        contrastText: "#1791ee",
      },
      error: {
        main: "#fff800",
      },
    },
    typography: {
      allVariants: {
        fontFamily: "Montserrat",
      },
      h1: {
        fontWeight: "800",
      },
      h3: {
        fontWeight: "800",
      },
      button: {
        textTransform: "none",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "90vh" }}
      >
        <Grid item md={6}>
          <Box
            sx={{ width: "100%", maxWidth: 600 }}
            display={{ xs: "none", sm: "block" }}
            md={6}
          >
            <img src={logo} alt="logo" />
            <Typography variant="h3" margin={3}>
              Kamion ile sorunsuz taşımacılık
            </Typography>
            <Typography variant="body1" color="yellow">
              Kamion sayesinde şirketinin FTL taşıma ihtiyaçları için anında
              fiyat al, süreçlerini hızlandır, güvenilir yük taşıyanlar ile
              çalış.
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          {selection ? <LoginForm /> : <RegisterForm />}

          <Typography variant="body1" margin={2}>
            {selection ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
            <Button
              style={{ marginLeft: 10 }}
              variant="outlined"
              size="small"
              onClick={() => {
                setSelection(!selection);
              }}
            >
              {selection ? "Kayıt Ol" : "Giriş Yap"}
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
