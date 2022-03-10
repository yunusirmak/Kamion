import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { useCarrier } from "../context/CarrierContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import {
  Avatar,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Dialog,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
export default function UploadDialog({ handleClose, open }) {
  const [text, setText] = useState("");
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };
  const CarrierSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    lastName: Yup.string().required("Lastname is required"),
    email: Yup.string().required("Email is required"),
    image: Yup.string().required("Image is required"),
  });
  const { changed, setChanged } = useCarrier();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const accessToken = JSON.parse(localStorage.getItem("user")).token || null;
  const addCarrier = async (name, lastName, email, image) => {
    const response = await axios.post(
      `${baseURL}/api/shipper/carrier`,
      {
        first_name: name,
        last_name: lastName,
        email: email,
        photo: image,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      image: null,
    },
    validationSchema: CarrierSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await addCarrier(
          values.firstName,
          values.lastName,
          values.email,
          values.image
        );
        handleClose();
        setChanged(!changed);
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setText(error.response.data.errors.photo[1]);
      }
    },
  });
  const {
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue,
  } = formik;
  const [avatarPreview, setAvatarPreview] = useState(
    "https://eitrawmaterials.eu/wp-content/uploads/2016/09/person-icon.png"
  );

  return (
    <Dialog open={open} onClose={handleClose} sx={{ p: 3 }}>
      <DialogTitle>Taşıyıcı Ekle</DialogTitle>

      <DialogContent>
        <DialogContentText paddingTop={3} paddingBottom={3} color={red}>
          {text}
        </DialogContentText>

        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box
                display="flex"
                textAlign="center"
                justifyContent="center"
                flexDirection="column"
              >
                <Avatar
                  sx={{
                    margin: "0 auto",
                    height: "100px",
                    width: "100px",
                    marginBottom: "10px",
                  }}
                  src={avatarPreview || formik.values?.image}
                />

                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  Choose Avatar
                  <input
                    name="image"
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    hidden
                    onChange={(e) => {
                      const fileReader = new FileReader();
                      fileReader.readAsDataURL(e.target.files[0]);
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setFieldValue("image", fileReader.result);
                          setAvatarPreview(fileReader.result);
                        }
                      };
                    }}
                  />
                </Button>
              </Box>
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
                  Ekle
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );
}
