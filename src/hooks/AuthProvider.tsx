import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  updateProfile,
} from "firebase/auth";
import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase";

type Role = "admin" | "stats" | "viewer" | undefined;

type UserAuthenticationState = {
  isAuthenticated: boolean;
  user: User | null;
  error: string;
  role: Role;
  isAuthorized: boolean;
};

type UserAuthenticationContext = UserAuthenticationState & {
  attemptLogin: (username: string, password: string) => Promise<boolean>;
  doLogout: () => void;
  canView: () => boolean;
  isAdmin: () => boolean;
  canAddStats: () => boolean;
  signUp: (
    username: string,
    password: string,
    name: string
  ) => Promise<boolean>;
};

const AuthContext = createContext<UserAuthenticationContext>({
  isAuthenticated: false,
  isAuthorized: false,
  user: null,
  attemptLogin: () => {
    return new Promise((resolve) => resolve(true));
  },
  signUp: () => {
    return new Promise((resolve) => resolve(true));
  },
  doLogout: () => {
    // default empty function
  },
  isAdmin: () => {
    return false;
  },
  canView: () => {
    return false;
  },
  canAddStats: () => {
    return false;
  },
  error: "",
  role: undefined,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<UserAuthenticationState>({
    isAuthenticated: false,
    user: null,
    error: "",
    role: undefined,
    isAuthorized: false,
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const role = (
        await auth.currentUser?.getIdTokenResult()
      )?.claims.role?.toString() as Role;
      const loggedIn = user !== null;

      setAuthState({
        ...authState,
        user,
        isAuthenticated: loggedIn,
        isAuthorized: loggedIn && canView(role),
        role,
      });
    });
    return unsub;
  }, []);

  const attemptLogin = async (username: string, password: string) => {
    let result;
    setAuthState({ ...authState, error: "" });
    try {
      result = await signInWithEmailAndPassword(auth, username, password);
    } catch (e) {
      setAuthState({
        ...authState,
        error: "Unable to login with this email and password",
      });
    }

    return result !== null;
  };

  const signUp = async (username: string, password: string, name: string) => {
    let result;
    try {
      result = await createUserWithEmailAndPassword(auth, username, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
    } catch (e) {
      // Do nothing yet
    }

    return result !== null;
  };

  const doLogout = () => {
    return signOut(auth);
  };

  const canView = (role: Role = authState.role) => {
    if (!role) {
      return false;
    }
    return ["viewer", "admin", "stats"].includes(role);
  };

  const canAddStats = (role: Role = authState.role) => {
    if (!role) {
      return false;
    }
    return ["admin", "stats"].includes(role);
  };

  const isAdmin = (role: Role = authState.role) => {
    if (!role) {
      return false;
    }
    return role === "admin";
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        attemptLogin,
        doLogout,
        canView,
        canAddStats,
        isAdmin,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};