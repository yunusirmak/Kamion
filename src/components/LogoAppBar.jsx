import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../pages/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";

export default function LogoAppBar() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ maxWidth: 1000, margin: "0 auto", padding: 5 }}
    >
      <Grid item>
        <img src={logo} alt="" height={50} />
      </Grid>
      <Grid item>
        <Button
          color="inherit"
          variant="outlined"
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
        >
          Çıkış Yap
          <LogoutIcon sx={{ pl: 1 }} />
        </Button>
      </Grid>
    </Grid>
  );
}
