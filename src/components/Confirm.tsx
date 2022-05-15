import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

type ConfirmProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  message: string;
  action: () => void;
};

export const Confirm = (props: ConfirmProps) => {
  const { open, handleClose, title = "Confirm", message, action } = props;

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          sx={{ position: "absolute", right: 10, top: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {message}
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ pt: 1 }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" onClick={action}>
              Confirm
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
