import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Avatar, Button, OutlinedInput, TextField } from "@mui/material";
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
import { styled } from "@mui/material/styles";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InputUpload = styled("input")({
  display: "none",
});

const AddUser = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Box>
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
                src="/static/images/avatar/1.jpg"
              />
              <FormControl
                fullWidth
                required
                margin="normal"
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={"text"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        edge="end"
                      >
                        <label htmlFor="contained-button-file">
                          <InputUpload
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                          />
                          <Button variant="contained" component="span">
                            Upload
                          </Button>
                        </label>
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Box>

            <TextField
              id="standard-basic"
              label={<FormattedMessage id="register.firstName" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              id="standard-basic"
              label={<FormattedMessage id="register.lastName" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              id="standard-basic"
              label={<FormattedMessage id="register.phone" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              id="standard-basic"
              label={<FormattedMessage id="login.email" />}
              variant="standard"
              fullWidth
              margin="normal"
              required
            />
            <FormControl margin="normal" required fullWidth variant="standard">
              <InputLabel htmlFor="standard-adornment-password">
                <FormattedMessage id="login.password" />
              </InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddUser;
