import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// imports and setup from components
import { selectToken } from '../../features/User/UserSlice';


const IsAuthenticated = ({children}) => {

    // Get the access token from the store
    const accessToken = useSelector(selectToken);

    // If access token exists, render the outlet else redirect to login page

    if(accessToken) {
        return <Navigate to={'/'}/>
    }

    return children
};

IsAuthenticated.propTypes = {
    children: PropTypes.node
};

export default IsAuthenticated;
