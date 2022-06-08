import { forwardRef, ReactElement, Ref, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { makeStyles } from "@mui/styles";
import UserType from "../../../../../../../@Types/UserType";
import axios from "axios";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";
import { Alert } from "@mui/material";
import { FormattedMessage } from "react-intl";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  button: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
});

interface DeleteUser {
  user: UserType;
  handleRefresh: Function;
}

const DeleteUser = (props: DeleteUser) => {
  const { user, handleRefresh } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [success, setSuccess] = useState<boolean>(false);
  const handleSuccess = () => {
    setSuccess(false);
  };

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const HandleDelete = () => {
    axios
      .delete(`http://localhost:3000/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          handleClose();
          handleRefresh();
        }, 50);
      })
      .catch((e) => {
        setError(true);
        setErrorMsg(e.response.data.message);
      });
  };

  return (
    <div>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={<FormattedMessage id="supreme.user.successfully" />}
        />
      ) : (
        ""
      )}
      <Button className={classes.button} onClick={handleClickOpen}>
        <FormattedMessage id="Delete" />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
      >
        <DialogTitle>
          <FormattedMessage id="Delete" />
          {user.firstName} {user.lastName} ?
        </DialogTitle>
        {error ? (
          <Alert
            onClose={() => {
              setError(false);
            }}
          >
            {errorMsg}!
          </Alert>
        ) : (
          ""
        )}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <FormattedMessage id="q.delete" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>
            <FormattedMessage id="canceled" />
          </Button>
          <Button
            color="error"
            onClick={() => {
              HandleDelete();
            }}
          >
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteUser;
