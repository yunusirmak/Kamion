import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditDialog from "./EditDialog";

export default function UserCard({ carrier }) {
  const [id, setId] = useState(carrier.id);
  const [name, setName] = useState(carrier.first_name);
  const [lastName, setLastName] = useState(carrier.last_name);
  const [email, setEmail] = useState(carrier.email);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 245,
          minWidth: 160,
          minHeight: 270,
          margin: "auto",
          borderRadius: "35px",
        }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={() => {
                handleClickOpen();
              }}
            >
              <EditIcon sx={{ color: "#1266f3" }} />
            </IconButton>
          }
        />
        <Avatar
          sx={{ bgcolor: "#1791ee", margin: "0 auto", height: 100, width: 100 }}
          src={carrier.image}
        />
        <CardContent>
          <Typography noWrap variant="h6" sx={{ color: "#1266f3" }}>
            {carrier.first_name} {carrier.last_name}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {carrier.email}
          </Typography>
        </CardContent>
      </Card>
      <EditDialog
        open={open}
        handleClose={handleClose}
        selectedName={name}
        selectedLastName={lastName}
        selectedEmail={email}
        selectedId={id}
      />
    </>
  );
}
