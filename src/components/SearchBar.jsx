import { TextField, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useCarrier } from "../context/CarrierContext";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { IconButton } from "@mui/material";
export default function Searchbar() {
  const { search, setSearch } = useCarrier();
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
      <TextField
        id="input"
        focused
        label="Arama Yap"
        type="text"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),

          endAdornment: search && (
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setSearch("");
              }}
            >
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          ),
        }}
      />
    </ThemeProvider>
  );
}
