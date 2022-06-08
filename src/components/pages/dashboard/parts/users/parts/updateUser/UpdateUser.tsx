import UserType from "../../../../../../../@Types/UserType";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import UploadImage from "../../../../../../parts/uploadImage/UploadImage";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";

interface UpdateUserProps {
  handleRefresh: Function;
  user: UserType;
}

const Roles = ["admin", "user"];

const useStyles = makeStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
});

const UpdateUser = (props: UpdateUserProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetState();
  };
  //--------------

  const classes = useStyles();
  const { user, handleRefresh } = props;

  const resetState = () => {
    setRole(user.role);
    setEmail(user.email);
    setAvatar(user.avatar);
    setPhone(user.phone);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [firstNameError, setFirstNameError] = useState<boolean>(false);

  const [lastName, setLastName] = useState<string>(user.lastName);
  const [lastNameError, setLastNameError] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>(user.phone);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [email, setEmail] = useState<string>(user.email);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [role, setRole] = useState<string[]>(user.role);
  const [roleError, setRoleError] = useState<boolean>(false);

  const [avatar, setAvatar] = useState<string>(user.avatar);

  const handleRole = (e: string) => {
    role.includes(e)
      ? setRole(role.filter((el) => el !== e))
      : setRole([...role, e]);
  };

  const handleImage = (e: string) => {
    setAvatar(e);
  };

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const handleUpdate = () => {
    setRoleError(() => role === []);
    setPhoneError(() => phone === "");
    setLastNameError(() => lastName === "");
    setFirstNameError(() => firstName === "");
    setEmailError(() => email === "");
    if (avatar && email && lastName && firstName && role && phone) {
      axios
        .put(
          "http://localhost:3000/user/" + user._id,
          {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
            phone: phone,
            avatar: avatar,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then(({ data }) => {
          setError(false);
          setSuccess(true);
          setTimeout(() => {
            handleClose();
            handleRefresh();
          }, 50);
        })
        .catch((e) => {
          console.log(e.response.data.message);
          setSuccess(false);
          setError(true);
          setErrorMsg(e.response.data.message);
        });
    }
  };

  const handleSuccess = () => {
    setSuccess(false);
  };

  return (
    <Box>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={<FormattedMessage id="Confirm.update" />}
        />
      ) : (
        ""
      )}
      <Button
        className={classes.button}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <FormattedMessage id={"Update"} />
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
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
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={firstName}
                src={avatar}
                sx={{ width: 56, height: 56, mr: 1 }}
              />
              <UploadImage
                handleImage={handleImage}
                avatar={avatar}
                name={"upload" + user._id}
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
            <FormGroup>
              {Roles.map((e, idx) => {
                return (
                  <FormControlLabel
                    checked={role.includes(e)}
                    onChange={() => handleRole(e)}
                    control={<Checkbox />}
                    label={e}
                    key={idx}
                  />
                );
              })}
            </FormGroup>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            <FormattedMessage id="canceled" />
          </Button>
          <Button
            onClick={() => {
              handleUpdate();
            }}
          >
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateUser;
