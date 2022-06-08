import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarSuccessProps {
  handleSuccess: Function;
  message: any;
}

const SnackbarSuccess = (props: SnackbarSuccessProps) => {
  const { handleSuccess, message } = props;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={true}
        autoHideDuration={6000}
        onClose={() => handleSuccess()}
      >
        <Alert
          onClose={() => handleSuccess()}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackbarSuccess;
