import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import Slide from "@mui/material/Slide";
import { forwardRef, ReactElement, Ref, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ProductsType from "../../../../../../../@Types/ProductsType";
import axios from "axios";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";
import { Alert } from "@mui/material";

const useStyles = makeStyles({
  button: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteProductProps {
  product: ProductsType;
  handleRefresh: Function;
}

const DeleteProduct = (props: DeleteProductProps) => {
  const classes = useStyles();
  const { product, handleRefresh } = props;
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSuccess = () => {
    setSuccess(false);
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:3000/product/" + product._id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          handleClose();
          handleRefresh();
        }, 50);
      })
      .catch((e) => {
        setErrorMsg(e.response.data.message);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <Box>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={`deleted ${product.name} successfuly`}
        />
      ) : (
        ""
      )}
      <Button
        startIcon={<DeleteIcon />}
        className={classes.button}
        onClick={handleClickOpen}
      >
        <Typography noWrap>
          <FormattedMessage id="Delete" />
        </Typography>
      </Button>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle> suprimer proudit : {product.name} </DialogTitle>
        <DialogContent>
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
          <DialogContentText id="alert-dialog-slide-description">
            Êtes-vous sûr de pouvoir suprimer ce produit ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="success" onClick={handleClose}>
            <FormattedMessage id="canceled" />
          </Button>
          <Button color="error" onClick={handleDelete}>
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DeleteProduct;
