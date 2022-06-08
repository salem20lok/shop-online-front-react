import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FormattedMessage } from "react-intl";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
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

const ChangePassword = () => {
  const { search } = useLocation();
  const access_token = search.slice(7);

  const classes = useStyles();
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [confirmedPassword, setConformedPassword] = useState<string>("");
  const [confirmedPasswordError, setConformedPasswordError] =
    useState<boolean>(false);
  const [showConformedPassword, setShowConformedPassword] =
    useState<boolean>(false);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleRegister = () => {
    setConformedPasswordError(() => confirmedPassword === "");
    setPasswordError(() => password === "");
    if (password && confirmedPassword) {
      axios
        .post(
          "http://localhost:3000/auth/change-password",
          {
            password: password,
            confirmedPassword: confirmedPassword,
          },
          { headers: { Authorization: `Bearer ${access_token}` } }
        )
        .then(() => {
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
            <FormattedMessage id="reset.password" />
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
            <FormControl
              error={passwordError}
              fullWidth
              margin="normal"
              variant="outlined"
              required
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

            <FormControl
              error={confirmedPasswordError}
              fullWidth
              margin="normal"
              variant="outlined"
              required
            >
              <InputLabel>
                <FormattedMessage id="login.password" />
              </InputLabel>
              <OutlinedInput
                type={showConformedPassword ? "text" : "password"}
                value={confirmedPassword}
                onChange={(e) => setConformedPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConformedPassword(!showConformedPassword)
                      }
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
                <FormattedMessage id="reset.password" />
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
