import "./HomePage.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import logo from "./img/logo.png";
import LoginForm from "./Login";
export default function HomePage() {
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
          <LoginForm />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
