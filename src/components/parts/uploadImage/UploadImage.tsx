import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Button, OutlinedInput } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { FormattedMessage } from "react-intl";

const InputUpload = styled("input")({
  display: "none",
});

interface UploadImageProps {
  handleImage: Function;
  avatar: string;
  name: string;
}

const UploadImage = (props: UploadImageProps) => {
  const { handleImage, avatar, name } = props;

  const uploadImage = (file: FileList | null) => {
    if (file === null) return;
    const formData = new FormData();
    formData.append("image", file[0]);
    axios
      .post("http://localhost:3000/uploads", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(({ data }) => {
        handleImage(data.url);
      })
      .catch((e) => {
        console.log(e.response.data.message);
      });
  };

  return (
    <FormControl fullWidth required margin="normal" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        <FormattedMessage id="avatar" />
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={"text"}
        value={avatar}
        disabled
        endAdornment={
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" edge="end">
              <label htmlFor={`contained-button-file/${name}`}>
                <InputUpload
                  accept="image/*"
                  id={`contained-button-file/${name}`}
                  multiple
                  type="file"
                  onChange={(e) => {
                    uploadImage(e.target.files);
                  }}
                />
                <Button variant="contained" component="span">
                  <FormattedMessage id="Upload" />
                </Button>
              </label>
            </IconButton>
          </InputAdornment>
        }
        label={<FormattedMessage id="avatar" />}
      />
    </FormControl>
  );
};

export default UploadImage;
