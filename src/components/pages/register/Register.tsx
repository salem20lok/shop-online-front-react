import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  background: {
    backgroundImage: "url('/images/register.jpg')",
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

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleRegister = () => {
    setLastNameError(() => lastName === "");
    setFirstNameError(() => firstName === "");
    setEmailError(() => email === "");
    setPasswordError(() => password === "");
    setPhoneError(() => phone === "");
    if (email && password && phone && firstName && lastName) {
      axios
        .post("http://localhost:3000/auth/register", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          phone: phone,
        })
        .then(({ data }) => {
          navigate("/login");
          setError(false);
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
            <FormattedMessage id="register.title" />
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
              label={<FormattedMessage id="register.firstName" />}
              variant="outlined"
              type="text"
              required
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={firstNameError}
            />
            <TextField
              label={<FormattedMessage id="register.lastName" />}
              variant="outlined"
              type="text"
              required
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={lastNameError}
            />
            <TextField
              label={<FormattedMessage id="register.phone" />}
              variant="outlined"
              type="tel"
              required
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={phoneError}
            />
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

            <FormControl
              variant="outlined"
              fullWidth
              required
              error={passwordError}
              margin="normal"
            >
              <InputLabel>
                <FormattedMessage id="login.password" />
              </InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label={<FormattedMessage id="login.password" />}
              />
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="submit"
                onClick={handleRegister}
                fullWidth
                sx={{ mt: 2 }}
                variant="contained"
              >
                <FormattedMessage id="register.title" />
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
