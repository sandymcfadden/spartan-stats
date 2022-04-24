import CloseIcon from "@mui/icons-material/Close";
import { Snackbar, IconButton } from "@mui/material";
import {
  useState,
  useContext,
  useMemo,
  useEffect,
  useCallback,
  createContext,
} from "react";

type SnackbarProviderProps = {
  children: React.ReactNode;
};

type SnackbarContext = {
  addAlert: (alert: Alert) => void;
};

type Alert = {
  open?: boolean;
  message: string;
  duration?: number;
  action?: JSX.Element;
};

export const SnackbarContext = createContext<SnackbarContext>({
  addAlert: () => {
    // Empty Function
  },
});

const AUTO_CLOSE = 5000;
const defaultAlert: Alert = {
  open: false,
  message: "",
};

export const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const [alert, setAlert] = useState<Alert>(defaultAlert);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(defaultAlert), AUTO_CLOSE);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const addAlert = useCallback((content: Alert) => {
    if (content.message !== "") {
      content.open = true;
      setAlert(content);
    }
  }, []);

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
