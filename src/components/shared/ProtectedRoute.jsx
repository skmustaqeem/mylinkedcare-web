import Constants from '@/utils/Constants';
import { CLEAR_STORAGE, CURRENT_USER } from '@/utils/Helpers';
import { useEffect } from 'react';

const isBrowser = () => typeof window !== "undefined";

const ProtectedRoute = ({ router, children, pathname }) => {
  let isAuthenticated = false;
  if (CURRENT_USER() != null) {
    isAuthenticated = true;
  }

  useEffect(() => {
    if (pathname === Constants.UNPROTECTED_ROUTES.LOGIN && CURRENT_USER() != null) {
      CLEAR_STORAGE();
    }
  }, [pathname])

  let unprotectedRoutes = [
    Constants.UNPROTECTED_ROUTES.LOGIN,
    Constants.UNPROTECTED_ROUTES.REGISTER,
    Constants.UNPROTECTED_ROUTES.REGISTER_PATIENT,
    Constants.UNPROTECTED_ROUTES.FORGOT_PASSWORD,
  ]

  let pathIsProtected = unprotectedRoutes.indexOf(pathname) === -1;

  if (isBrowser() && !isAuthenticated && pathIsProtected && false) {
    router.push(Constants.UNPROTECTED_ROUTES.LOGIN);
  }

  return children
}

export default ProtectedRoute