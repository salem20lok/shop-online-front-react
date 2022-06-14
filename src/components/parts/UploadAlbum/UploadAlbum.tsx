import { useState } from "react";
import Box from "@mui/material/Box";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import SimpleDialog from "./parts/SimpleDialog";

interface UploadAlbumProps {
  deleteImage: Function;
  addImage: Function;
  images: string[];
  name: string;
}

const UploadAlbum = (props: UploadAlbumProps) => {
  const { deleteImage, addImage, images, name } = props;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-Between" }}>
      <AvatarGroup max={3}>
        {images.map((e, idx) => {
          return <Avatar alt={e} key={idx} src={e} />;
        })}
      </AvatarGroup>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        deleteImage={deleteImage}
        addImage={addImage}
        onClose={handleClose}
        open={open}
        images={images}
        name={name}
      />
    </Box>
  );
};

export default UploadAlbum;
