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
import { makeStyles } from "@mui/styles";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { FormEvent, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Send } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  contentLeft: {
    backgroundImage: "url('/images/login.jpg')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
  },
  container: {
    height: "100vh",
  },
  box: {
    width: "60%",
    left: "50%",
    top: "50%",
    position: "absolute",
    transform: "translate(-50%, -50%)",
  },
});

const Login = () => {
  const classes = useStyles();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = () => {
    setPasswordError(() => password === "");
    setEmailError(() => email === "");

    if (email !== "" && password !== "") {
      axios
        .post("http://localhost:3000/auth/login", {
          password: password,
          email: email,
        })
        .then(({ data }) => {
          localStorage.setItem("accessToken", data.accessToken);
          setError(false);
          navigate("/");
        })
        .catch((e) => {
          setError(true);
          setErrorMessage(e.response.data.message);
          console.log(e.response.data.message);
        });
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        md={6}
        xs={0}
        className={classes.contentLeft}
        component={Paper}
        elevation={3}
      />
      <Grid sx={{ height: "100vh", position: "relative" }} item md={6} xs={12}>
        <Box className={classes.box}>
          <Avatar
            sx={{ m: "10px auto", width: 56, height: 56, bgcolor: "#629cf6" }}
          >
            <LockOpenIcon />
          </Avatar>

          <Typography align="center" variant="h3" component="div" gutterBottom>
            <FormattedMessage id="login.title" />
          </Typography>

          {error ? (
            <Alert onClose={() => setError(false)} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}

          <form onSubmit={(e) => handleSubmit(e)}>
            <TextField
              id="outlined-basic"
              label={<FormattedMessage id="login.email" />}
              variant="outlined"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              margin="normal"
              error={emailError}
              required
            />

            <FormControl
              error={passwordError}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            >
              <InputLabel htmlFor="outlined-adornment-password">
                <FormattedMessage id="login.password" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label={<FormattedMessage id="login.password" />}
              />
            </FormControl>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Link to={"/register"}>Create New Account ?</Link>
              <Link to={"/forget-password"}>Forget Password ?</Link>
            </Box>

            <Button
              onClick={handleLogin}
              sx={{ mt: 1 }}
              fullWidth
              variant="contained"
              type="submit"
              endIcon={<Send />}
            >
              <FormattedMessage id="login.btnSend" />
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
