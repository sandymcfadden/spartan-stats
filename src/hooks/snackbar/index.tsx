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
  closeAlert: () => void;
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
  closeAlert: () => {
    // Empty Function
  },
});

const AUTO_CLOSE = 6000;
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

  const closeAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const value = useMemo(() => ({ addAlert, closeAlert }), [addAlert]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        key={alert.message}
        open={alert.open}
        autoHideDuration={alert.duration || AUTO_CLOSE}
        onClose={closeAlert}
        message={alert.message}
        action={
          <>
            {alert.action ? alert.action : null}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeAlert}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      ></Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
