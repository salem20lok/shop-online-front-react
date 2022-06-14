import Box from "@mui/material/Box";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProductsType from "../../../../../../../@Types/ProductsType";
import { Alert, MenuItem, Select, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CategoryType from "../../../../../../../@Types/CategoryType";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";
import UploadAlbum from "../../../../../../parts/UploadAlbum/UploadAlbum";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const InputUpload = styled("input")({
  display: "none",
});

const useStyles = makeStyles({
  button: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
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

interface UpdateProductProps {
  product: ProductsType;
  handleRefresh: Function;
}

const UpdateProduct = (props: UpdateProductProps) => {
  const { handleRefresh, product } = props;
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    restState();
  };

  //---------------------------------------
  const restState = () => {
    setSales(product.sales);
    setPrice(product.price);
    setTva(product.tva);
    setQuantity(product.quantity);
    setDescription(product.description);
    setName(product.name);
    setCategory(product.category);
    setImages(product.images);
  };

  const [price, setPrice] = useState<number>(product.price);
  const [priceError, setPriceError] = useState<boolean>(false);

  const [name, setName] = useState<string>(product.name);
  const [nameError, setNameError] = useState<boolean>(false);

  const [category, setCategory] = useState<string>(product.category);
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(product.description);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [quantityError, setQuantityError] = useState<boolean>(false);

  const [tva, setTva] = useState<number>(product.tva);
  const [tvaError, setTvaError] = useState<boolean>(false);

  const [sales, setSales] = useState<number>(product.sales);
  const [salesError, setSalesError] = useState<boolean>(false);

  const [images, setImages] = useState<string[]>(product.images);

  const deleteImage = (payload: string) => {
    setImages(() => images.filter((e) => e !== payload));
  };

  const addImage = (payload: string) => {
    setImages(() => [...images, payload]);
  };

  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/category/all-category")
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  }, []);

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleUpdate = () => {
    setCategoryError(() => category === "");
    setDescriptionError(() => description === "");
    setNameError(() => name === "");
    setPriceError(() => price === 0);
    setQuantityError(() => quantity === null);
    setSalesError(() => sales === null);
    setTvaError(() => tva === null);
    axios
      .put(
        "http://localhost:3000/product/" + product._id,
        {
          name: name,
          images: images,
          price: price,
          quantity: quantity,
          sales: sales,
          tva: tva,
          category: category,
          description: description,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
          message={"update product Successfully"}
        />
      ) : (
        ""
      )}
      <Button
        className={classes.button}
        onClick={() => {
          handleClickOpen();
        }}
        endIcon={<BrowserUpdatedIcon />}
      >
        <Typography noWrap>
          <FormattedMessage id={"Update"} />
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
        <DialogTitle>{"Êtes-vous sûr de changer ce produit ?"}</DialogTitle>
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
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <UploadAlbum
              deleteImage={deleteImage}
              addImage={addImage}
              images={images}
              name={"updateProduct" + product._id}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              type="text"
              label="name"
              variant="standard"
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={nameError}
            />

            <FormControl
              key={"update"}
              variant="standard"
              fullWidth
              required
              margin="normal"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Age
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Age"
              >
                {categories.map((el) => {
                  return (
                    <MenuItem key={el._id + "update"} value={el.name}>
                      {el.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              id="filled-multiline-static"
              label="description"
              multiline
              rows={2}
              margin="normal"
              variant="standard"
              required
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={descriptionError}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              type="number"
              label="Price"
              variant="standard"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
              error={priceError}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              type="number"
              label="quantity"
              variant="standard"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              value={quantity}
              error={quantityError}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              type="number"
              label="Tva"
              variant="standard"
              onChange={(e) => setTva(parseFloat(e.target.value))}
              value={tva}
              error={tvaError}
            />

            <TextField
              fullWidth
              required
              margin="normal"
              type="number"
              label="sales"
              variant="standard"
              onChange={(e) => setSales(parseFloat(e.target.value))}
              value={sales}
              error={salesError}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="canceled" />
          </Button>
          <Button onClick={handleUpdate}>
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpdateProduct;
