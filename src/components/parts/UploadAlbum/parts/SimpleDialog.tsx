import List from "@mui/material/List";
import Dialog from "@mui/material/Dialog";
import { Avatar, Button, Grid, ListItem, ListItemAvatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import ListItemButton from "@mui/material/ListItemButton";
import axios from "axios";
import { pink } from "@mui/material/colors";

const Input = styled("input")({
  display: "none",
});

const useStyle = makeStyles({
  img: {
    width: "80px",
    height: "80px",
    padding: 0,
    margin: "0 auto",
  },
});
const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export interface SimpleDialogProps {
  open: boolean;
  onClose: Function;
  images: string[];
  deleteImage: Function;
  addImage: Function;
  name: string;
}

const SimpleDialog = (props: SimpleDialogProps) => {
  const { onClose, open, images, deleteImage, addImage, name } = props;

  const handleClose = () => {
    onClose();
  };

  const classes = useStyle();
  const [dense, setDense] = useState(false);
  const [secondary, setSecondary] = useState(false);

  const uploadImage = (file: FileList | null) => {
    if (file === null) return;
    const formData = new FormData();
    formData.append("image", file[0]);
    axios
      .post("http://localhost:3000/uploads", formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then(({ data }) => {
        addImage(data.url);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ p: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Avatar with text and icon
          </Typography>
          <Demo>
            <List dense={dense}>
              {images.map((el, idx) => {
                return (
                  <ListItem
                    key={idx}
                    secondaryAction={
                      <IconButton
                        onClick={() => deleteImage(el)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={el} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={el.slice(30)}
                      secondary={secondary ? "Secondary text" : null}
                    />
                  </ListItem>
                );
              })}
              <label htmlFor={"contained-button-file" + name}>
                <Input
                  accept="image/*"
                  id={"contained-button-file" + name}
                  multiple
                  type="file"
                  onChange={(e) => uploadImage(e.target.files)}
                />
                <ListItemButton autoFocus>
                  <ListItemAvatar>
                    <Avatar>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Add account" />
                </ListItemButton>
              </label>
            </List>
          </Demo>
        </Grid>
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleDialog;
