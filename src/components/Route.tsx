import { useRoute, Redirect } from "wouter";
import { useAuth } from "../hooks/AuthProvider";

type Props = {
  children:
    | JSX.Element
    | ((params?: { [x: string]: string }) => JSX.Element)
    | null;
  match?: [];
  path: string;
  authRequired?: boolean;
  adminRequired?: boolean;
};

export const Route = ({
  children,
  match,
  path,
  authRequired,
  adminRequired,
}: Props) => {
  const useRouteMatch = useRoute(path);
  const [matches, params] = match || useRouteMatch;
  const { isAuthenticated, isAuthorized, isLoggingIn, isAdmin } = useAuth();

  if (!matches) return null;

  if (isLoggingIn) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  if (adminRequired && !isAdmin()) {
    return <Redirect to="/" />;
  }

  if (authRequired && !isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && !isAuthorized && path !== "/needs-approval") {
    return <Redirect to="/needs-approval" />;
  }

  if (!authRequired && isAuthorized) {
    return <Redirect to="/" />;
  }

  return typeof children === "function" ? children(params) : children;
};
