import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormattedMessage } from "react-intl";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles({
  background: {
    backgroundImage: "url('/images/forget.jpg')",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  grid: {
    height: "100vh",
  },
  box: {
    width: "80%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
    padding: "10px",
  },
  link: {
    textDecoration: "none",
    position: "absolute",
    top: 15,
    left: 15,
    display: "flex",
    padding: "10px",
    color: "#000",
    justifyContent: "space-around",
    alignItems: "center",
    opacity: "0.5",
    transition: "all 0.3",
    "&:hover": {
      opacity: 1,
    },
  },
});

const ForgetPassword = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleRegister = () => {
    setEmailError(() => email === "");
    if (email) {
      axios
        .post(
          "http://localhost:3000/auth/forget-password",
          {},
          {
            params: {
              email: email,
            },
          }
        )
        .then(({ data }) => {
          setError(false);
          navigate("/login");
        })
        .catch((e) => {
          setError(true);
          setErrorMessage(e.response.data.message);
        });
    }
  };

  return (
    <Grid className={classes.grid} container>
      <Link className={classes.link} to={"/login"}>
        <ArrowBackIcon /> <FormattedMessage id="Back.to.Login" />
      </Link>
      <Grid
        item
        className={classes.background}
        sm={6}
        xs={0}
        component={Paper}
        elevation={3}
      />
      <Grid sx={{ position: "relative" }} item sm={6} xs={12}>
        <Box className={classes.box}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Avatar sx={{ height: 56, width: 56, bgcolor: "#629cf6" }}>
              <AssignmentIndIcon />
            </Avatar>
          </Box>
          <Typography align="center" variant="h3" component="div" gutterBottom>
            <FormattedMessage id="forgetPassword.title" />
          </Typography>

          {error ? (
            <Alert
              severity="error"
              onClose={() => {
                setError(false);
              }}
            >
              {errorMessage}!
            </Alert>
          ) : (
            ""
          )}

          <form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            noValidate
          >
            <TextField
              label={<FormattedMessage id="login.email" />}
              variant="outlined"
              type="email"
              required
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
            />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                onClick={handleRegister}
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                <FormattedMessage id="forgetPassword.title" />
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
