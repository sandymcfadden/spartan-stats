import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useState, createContext, useContext, useEffect } from "react";
import { auth } from "../firebase";

export type Role = "admin" | "stats" | "viewer" | "";

type UserAuthenticationState = {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  user: User | null;
  error: string;
  role: Role;
  isAuthorized: boolean;
};

type UserAuthenticationContext = UserAuthenticationState & {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  canView: () => boolean;
  isAdmin: () => boolean;
  canAddStats: () => boolean;
  signUp: (
    username: string,
    password: string,
    name: string
  ) => Promise<boolean>;
  forgotPass: (email: string) => void;
};

const AuthContext = createContext<UserAuthenticationContext>({
  isAuthenticated: false,
  isAuthorized: false,
  isLoggingIn: true,
  user: null,
  login: () => {
    return new Promise((resolve) => resolve(true));
  },
  signUp: () => {
    return new Promise((resolve) => resolve(true));
  },
  logout: () => {
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
  forgotPass: () => {
    // default empty function
  },
  error: "",
  role: "",
});

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<UserAuthenticationState>({
    isAuthenticated: false,
    isLoggingIn: true,
    user: null,
    error: "",
    role: "",
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
        isLoggingIn: false,
        isAuthorized: loggedIn && canView(role),
        role,
      });
    });
    return unsub;
  }, []);

  const login = async (username: string, password: string) => {
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
      setAuthState({
        ...authState,
        error: "Unable to create account. Please try again.",
      });
    }

    return result !== null;
  };

  const logout = () => {
    return signOut(auth);
  };

  const forgotPass = (email: string) => {
    sendPasswordResetEmail(auth, email);
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
        login,
        logout,
        canView,
        canAddStats,
        isAdmin,
        signUp,
        forgotPass,
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
