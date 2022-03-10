import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useCarrier } from "../context/CarrierContext";

export default function BottomPagination() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
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
  const { currentPage, setCurrentPage, totalPages } = useCarrier();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Pagination
          sx={{
            backgroundColor: "white",
            maxWidth: 350,
            borderRadius: "5px",
            marginLeft: 3,
          }}
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
        />
      </Stack>
    </ThemeProvider>
  );
}
