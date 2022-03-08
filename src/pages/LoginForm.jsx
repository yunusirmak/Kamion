import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email adresi gerçek olmalı.")
      .required("Email gerekli."),
    password: Yup.string().required("Şifre gerekli"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {},
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h1" margin={1}>
            Giriş
          </Typography>
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

        <LoadingButton
          sx={{ my: 2 }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Giriş Yap
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
