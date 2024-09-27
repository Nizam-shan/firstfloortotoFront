import React from "react";
import { Box, Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import { RegisterService } from "../services/userServices";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    confirm_password: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    first_name: Yup.string().required("First name is required").trim(),

    confirm_password: Yup.string()
      .required("Confirm passsword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    setSubmitting(true);

    RegisterService(values)
      .then((res) => {
        const data = res.data;
        console.log("🚀 ~ .then ~ data:", data);

        if (data.status_code === 201) {
          navigate("/");
          toast.success(data?.message || "Login sucessfull");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        toast.error(
          err?.response?.data?.message ||
            "Some error occurred. Please try again"
        );
      });
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h1 style={{ color: "#227cf2" }}>SignUp</h1>
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          border: "3px solid #227cf2",
          borderRadius: "10px",
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            isSubmitting,
            setFieldValue,
            handleChange,
            values,
            touched,
            errors,
          }) => (
            <Form>
              <TextField
                margin="dense"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
                value={values.first_name}
                onChange={handleChange}
                error={touched.first_name && errors.first_name}
                helperText={touched.first_name && errors.first_name}
              />

              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <TextField
                margin="dense"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                fullWidth
                value={values.confirm_password}
                onChange={handleChange}
                error={
                  touched.confirm_password && Boolean(errors.confirm_password)
                }
                helperText={touched.confirm_password && errors.confirm_password}
              />

              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{ textTransform: "none", mt: 2 }}
              >
                Signup
              </Button>
              <p>
                Already have an account ?{" "}
                <span
                  style={{ color: "#227cf2", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default SignUpPage;
