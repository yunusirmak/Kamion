import UserCard from "../components/UserCard";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Searchbar from "../components/SearchBar";
import { useCarrier } from "../context/CarrierContext";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import UploadDialog from "../components/UploadDialog";
export default function Users() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    filtered,
    carriers,
    setCarriers,
    setTotalPages,
    setCurrentPage,
    currentPage,
    search,
    setFiltered,
    changed,
  } = useCarrier();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const accessToken = JSON.parse(localStorage.getItem("user")).token || null;
  useEffect(() => {
    const result = carriers.filter(
      (carrier) =>
        carrier.first_name.toLowerCase().includes(search.toLowerCase()) ||
        carrier.last_name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [carriers, search]);
  useEffect(async () => {
    const response = await axios.get(
      `${baseURL}/api/shipper/carrier?page=${currentPage}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "*/*",
        },
      }
    );
    setCarriers(response.data.data);
    setTotalPages(response.data.meta.last_page);
  }, [currentPage, changed]);

  useEffect(() => {
    setCarriers([]);
    setCurrentPage(1);
  }, [accessToken]);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ maxWidth: 1100, margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6} lg={5}>
          <Searchbar />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Button
            color="inherit"
            variant="outlined"
            size="large"
            sx={{
              height: 55,
              border: "2px solid #fff",
              marginTop: { xs: 2, sm: 0 },
            }}
            onClick={() => {
              handleClickOpen();
            }}
          >
            Yeni Taşıyıcı Ekle
            <AddIcon sx={{ pl: 1 }} />
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: 1250,
          margin: "0 auto",
          padding: 5,
        }}
      >
        {filtered.map((carrier) => (
          <Grid item width={220} key={carrier.id}>
            <UserCard carrier={carrier} />
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item>
            <h1>Taşıyıcı bulunamadı...</h1>
          </Grid>
        )}
      </Grid>
      <Pagination
        sx={{
          padding: 5,
        }}
      />
      <UploadDialog open={open} handleClose={handleClose} />
    </>
  );
}
