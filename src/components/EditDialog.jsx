import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useCarrier } from "../context/CarrierContext";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  TextField,
  Stack,
  Box,
} from "@mui/material";
export default function EditDialog({
  selectedName,
  selectedEmail,
  selectedLastName,
  selectedId,
  handleClose,
  open,
}) {
  const CarrierSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string().required("Email is required"),
  });
  const { changed, setChanged } = useCarrier();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const accessToken = JSON.parse(localStorage.getItem("user")).token || null;
  const updateCarrier = async (id, name, lastName, email) => {
    const response = await axios.post(
      `${baseURL}/api/shipper/update-carrier/${id}`,
      {
        first_name: name,
        last_name: lastName,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "*/*",
        },
      }
    );
    console.log(response);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: selectedId,
      firstName: selectedName,
      lastName: selectedLastName,
      email: selectedEmail,
    },
    validationSchema: CarrierSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await updateCarrier(
          values.id,
          values.firstName,
          values.lastName,
          values.email
        );
        handleClose();
        setChanged(!changed);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    },
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleClose} sx={{ p: 3 }}>
      <DialogTitle>Taşıyıcıyı Güncelle</DialogTitle>

      <DialogContent>
        <DialogContentText paddingTop={3} paddingBottom={3}>
          Değişiklik yapabilirsiniz.
        </DialogContentText>

        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="İsim"
                placeholder={"İsim"}
                {...getFieldProps("firstName")}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                label="Soyisim"
                placeholder="Soyisim"
                {...getFieldProps("lastName")}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                fullWidth
                label="Email"
                placeholder="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={handleClose} color="inherit">
                  İptal
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  style={{ marginLeft: 15 }}
                >
                  Güncelle
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
