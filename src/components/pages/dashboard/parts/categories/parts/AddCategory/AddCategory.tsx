import Box from "@mui/material/Box";
import CategoryIcon from "@mui/icons-material/Category";
import { Alert, Avatar, Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { forwardRef, ReactElement, Ref, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import UploadImage from "../../../../../../parts/uploadImage/UploadImage";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddCategoryProps {
  handleRefresh: Function;
}

const AddCategory = (props: AddCategoryProps) => {
  const { handleRefresh } = props;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [avatar, setAvatar] = useState<string>("");
  const [avatarError, setAvatarError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const handleImage = (payload: string) => {
    setAvatar(payload);
  };

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleCategory = () => {
    setNameError(() => name === "");
    setAvatarError(() => avatar === "");
    axios
      .post(
        "http://localhost:3000/category",
        {
          image: avatar,
          name: name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then(({ data }) => {
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          handleClose();
          handleRefresh();
        }, 50);
      })
      .catch((e) => {
        setError(true);
        setSuccess(false);
        setErrorMsg(e.response.data.message);
      });
  };

  const handleSuccess = () => {
    setSuccess(false);
  };

  return (
    <Box>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={"add category succssfuly"}
        />
      ) : (
        ""
      )}
      <Button
        onClick={handleClickOpen}
        startIcon={<CategoryIcon />}
        variant="outlined"
      >
        Add Category
      </Button>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
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
          <form autoComplete="off" noValidate>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={name}
                src={avatar}
                sx={{ width: 56, height: 56, mr: 1 }}
              />
              <UploadImage
                handleImage={handleImage}
                avatar={avatar}
                name={"add-category"}
              />
            </Box>
            <TextField
              error={nameError}
              required
              fullWidth
              margin="normal"
              id="standard-basic"
              label="CategoryryName"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="canceled" />
          </Button>
          <Button onClick={handleCategory}>
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCategory;
