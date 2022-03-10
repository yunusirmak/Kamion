import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useAuth } from "../context/AuthContext";
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// ----------------------------------------------------------------------

export default function RegisterForm({ setSelection }) {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email adresi gerçek olmalı.")
      .required("Email adresi gerekli."),
    password: Yup.string().required("Şifre gerekli."),
    phoneNumber: Yup.string()
      .required("Telefon numarası gerekli.")
      .matches(phoneRegExp, "Telefon numarası gerçek olmalı."),
    username: Yup.string()
      .min(5, "Çok kısa!")
      .max(20, "Çok uzun!")
      .required("Kullanıcı adı gerekli."),
    firstName: Yup.string()
      .min(2, "Çok kısa!")
      .max(50, "Çok uzun!")
      .required("İsim gerekli."),
    lastName: Yup.string()
      .min(2, "Çok kısa!")
      .max(50, "Çok uzun!")
      .required("Soyisim gerekli."),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await register(
          values.username,
          values.password,
          values.firstName,
          values.lastName,
          values.phoneNumber,
          values.email
        );
        resetForm();
        setSelection(true);
      } catch (error) {
        setErrors({
          email: "Bu kullanıcı zaten kayıtlı.",
        });
      }
      setSubmitting(false);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="on" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h1" margin={1}>
            Kayıt
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              focused
              id="input"
              label="İsim"
              {...getFieldProps("firstName")}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              focused
              id="input"
              label="Soyisim"
              {...getFieldProps("lastName")}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              focused
              id="input"
              label="Kullanıcı Adı"
              {...getFieldProps("username")}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              fullWidth
              focused
              id="input"
              type={showPassword ? "text" : "password"}
              label="Şifre"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? (
                        <VisibilityIcon fontSize="small" />
                      ) : (
                        <VisibilityOffIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              fullWidth
              focused
              id="input"
              type="email"
              label="Email adresi"
              {...getFieldProps("email")}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              focused
              id="input"
              label="Telefon Numarası"
              placeholder="905345343434"
              {...getFieldProps("phoneNumber")}
              error={Boolean(touched.phoneNumber && errors.phoneNumber)}
              helperText={touched.phoneNumber && errors.phoneNumber}
            />
          </Stack>
        </Stack>

        <LoadingButton
          sx={{ my: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Kayıt Ol
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
