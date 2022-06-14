import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { forwardRef, MouseEvent, ReactElement, Ref, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FormattedMessage } from "react-intl";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "@mui/material/Input";
import axios from "axios";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";
import UploadImage from "../../../../../../parts/uploadImage/UploadImage";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Roles = ["admin", "user"];

interface AddUserProps {
  handleRefresh: Function;
}

const AddUser = (props: AddUserProps) => {
  const { handleRefresh } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setAvatar("/images/avatar.png");
    setEmailError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setPhoneError(false);
    setPasswordError(false);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [avatar, setAvatar] = useState("/images/avatar.png");

  const [role, setRole] = useState<string[]>([]);

  const handleCheckBox = (el: string) => {
    role.includes(el)
      ? setRole(role.filter((e) => e !== el))
      : setRole(() => [...role, el]);
  };

  const handleImage = (e: string) => {
    setAvatar(e);
  };

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccess = () => {
    setSuccess(false);
  };

  const handleAddUser = () => {
    setEmailError(() => email === "");
    setFirstNameError(() => firstName === "");
    setLastNameError(() => lastName === "");
    setPhoneError(() => phone === "");
    setPasswordError(() => password === "");
    if (
      email &&
      phone &&
      password &&
      email &&
      avatar &&
      firstName &&
      lastName
    ) {
      axios
        .post(
          "http://localhost:3000/user/admin",
          {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            avatar: avatar,
            password: password,
            email: email,
            role: role,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(({ data }) => {
          handleRefresh();
          setError(false);
          setSuccess(true);
          handleClose();
        })
        .catch((e) => {
          setError(true);
          setErrorMsg(e.response.data.message);
        });
    }
  };

  return (
    <Box>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={<FormattedMessage id="add.user" />}
        />
      ) : (
        ""
      )}
      <Button
        onClick={handleClickOpen}
        endIcon={<PersonAddAltIcon />}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Add User
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>{" Add user ?"}</DialogTitle>
        <DialogContent>
          {error ? (
            <Alert
              severity="error"
              onClose={() => {
                setError(false);
              }}
            >
              {errorMsg}!
            </Alert>
          ) : (
            ""
          )}
          <form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            noValidate
          >
            <Box
              sx={{
                justifyContent: "space-between",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ height: 50, width: 50, mr: 2 }}
                alt="Remy Sharp"
                src={avatar}
              />
              <UploadImage
                name={"add"}
                handleImage={handleImage}
                avatar={avatar}
              />
            </Box>

            <TextField
              label={<FormattedMessage id="register.firstName" />}
              variant="standard"
              fullWidth
              margin="normal"
              error={firstNameError}
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label={<FormattedMessage id="register.lastName" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
              error={lastNameError}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              type="tel"
              label={<FormattedMessage id="register.phone" />}
              variant="standard"
              fullWidth
              margin="normal"
              error={phoneError}
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              type="email"
              label={<FormattedMessage id="login.email" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
              error={emailError}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl
              margin="normal"
              required
              fullWidth
              error={passwordError}
              variant="standard"
            >
              <InputLabel required htmlFor="standard-adornment-password">
                <FormattedMessage id="login.password" />
              </InputLabel>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                error={passwordError}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormGroup row sx={{ mt: 2 }}>
              {Roles.map((el, e) => {
                return (
                  <FormControlLabel
                    checked={role.includes(el)}
                    onChange={() => handleCheckBox(el)}
                    control={<Checkbox />}
                    label={el}
                    key={e}
                  />
                );
              })}
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="canceled" />
          </Button>
          <Button
            onClick={() => {
              handleAddUser();
            }}
          >
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUser;
