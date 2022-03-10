import Router from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { CarrierProvider } from "./context/CarrierContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const theme = createTheme({
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
    <div className="App">
      <AuthProvider>
        <CarrierProvider>
          <ThemeProvider theme={theme}>
            <Router />
          </ThemeProvider>
        </CarrierProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
