import Box from "@mui/material/Box";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Alert, Button, MenuItem, Select, TextField } from "@mui/material";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { FormattedMessage } from "react-intl";
import SnackbarSuccess from "../../../../../../parts/SnackbarSuccess/SnackbarSuccess";
import CategoryType from "../../../../../../../@Types/CategoryType";
import UploadAlbum from "../../../../../../parts/UploadAlbum/UploadAlbum";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface AddProductProps {
  handleRefresh: Function;
}

const AddProduct = (props: AddProductProps) => {
  const { handleRefresh } = props;

  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    restState();
  };

  //---------------------------------------------

  const restState = () => {
    setSales(0);
    setPrice(0);
    setTva(0);
    setQuantity(0);
    setDescription("");
    setName("");
    setCategory("");
    setImages([]);
  };

  const [price, setPrice] = useState<number>(0);
  const [priceError, setPriceError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);

  const [category, setCategory] = useState<string>("");
  const [categoryError, setCategoryError] = useState<boolean>(false);

  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(0);
  const [quantityError, setQuantityError] = useState<boolean>(false);

  const [tva, setTva] = useState<number>(0);
  const [tvaError, setTvaError] = useState<boolean>(false);

  const [sales, setSales] = useState<number>(0);
  const [salesError, setSalesError] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSuccess = () => {
    setSuccess(false);
  };

  const HandleAddProduct = () => {
    setCategoryError(() => category === "");
    setDescriptionError(() => description === "");
    setNameError(() => name === "");
    setPriceError(() => price === 0);
    setQuantityError(() => quantity === null);
    setSalesError(() => sales === null);
    setTvaError(() => tva === null);

    axios
      .post(
        "http://localhost:3000/product",
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

  const [images, setImages] = useState<string[]>([]);

  const deleteImage = (payload: string) => {
    setImages(() => images.filter((e) => e !== payload));
  };

  const addImage = (payload: string) => {
    setImages(() => [...images, payload]);
  };

  return (
    <Box>
      {success ? (
        <SnackbarSuccess
          handleSuccess={handleSuccess}
          message={"peoudtct Ajouter Avec Success"}
        />
      ) : (
        ""
      )}
      <Button
        onClick={handleClickOpen}
        startIcon={<AddCardIcon />}
        variant="outlined"
      >
        Add Product
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth
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

          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <UploadAlbum
              images={images}
              addImage={addImage}
              deleteImage={deleteImage}
              name={"add-product"}
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

            <FormControl margin="dense" fullWidth required variant="standard">
              <InputLabel id="demo-simple-select-standard-label-add">
                category
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard-add"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="category"
                error={categoryError}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((el) => {
                  return (
                    <MenuItem key={el._id + "add"} value={el.name}>
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
          <Button onClick={HandleAddProduct}>
            <FormattedMessage id="confirmed" />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddProduct;
