import {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  createContext,
} from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const SnackbarContext = createContext();

const AUTO_DISMISS = 5000;

export const SnackbarProvider = ({ children }) => {
  const [alert, setAlert] = useState({});

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert({}), AUTO_DISMISS);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const addAlert = useCallback((content) => setAlert(content), []);

  const value = useMemo(() => ({ addAlert }), [addAlert]);

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        key={alert.message}
        open={alert.open}
        autoHideDuration={alert.duration ? alert.duration : 6000}
        onClose={handleClose}
        message={alert.message}
        action={
          alert.action ? (
            alert.action
          ) : (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )
        }
      ></Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
