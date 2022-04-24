import { useRoute, Redirect } from "wouter";
import { useAuth } from "../hooks/AuthProvider";

type Props = {
  children?: React.ReactNode;
  match?: [];
  path: string;
  authRequired?: boolean;
  adminRequired?: boolean;
};

export const Route: React.VFC<Props> = ({
  children,
  match,
  path,
  authRequired,
  adminRequired,
}) => {
  const useRouteMatch = useRoute(path);
  const [matches, params] = match || useRouteMatch;
  const { isAuthenticated, isAuthorized, isAdmin } = useAuth();

  if (!matches) return null;

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
