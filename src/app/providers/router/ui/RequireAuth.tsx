import { useSelector } from 'react-redux';
import { getUserAuthData, UserRole } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useMemo } from 'react';
import { ForbiddenPage } from 'pages/ForbiddenPage';
import { getUserRoles } from 'entities/User/';

interface RequireAuthProps {
  roles: UserRole[] | undefined
  children: JSX.Element
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()

  const userRoles = useSelector(getUserRoles)

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true
    }

    return roles.some((requiredRole) => {
      return userRoles?.includes(requiredRole)
    })
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return <ForbiddenPage />;
  }
  return children;
};
