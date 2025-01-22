import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

// imports and setup from components
import { selectToken, selectUser } from '../../features/User/UserSlice';

/**
 * ProtectedRoutes component to handle route protection based on authentication.
 *
 * This component checks if the user has a valid access token. If the token is not present,
 * it redirects the user to the login page. If the token is present, it allows access to the
 * child routes based on the user's role.
 *
 */
const ProtectedRoutes = ({ roles }) => {
  // Get the access token and user from the store
  const accessToken = useSelector(selectToken);
  const user = useSelector(selectUser);


  // Check if the user is authenticated
  if (!accessToken || !user?.role) {
    return <Navigate to="/login" replace={true} />;
  }
   
  
  // Check if the user has one of the required roles
  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace={true} />;
  }

  // If access token exists and user has one of the required roles, render the outlet
  return <Outlet />;
};

ProtectedRoutes.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoutes;
