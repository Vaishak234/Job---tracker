import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { selectToken } from "../..//features/User/UserSlice";
import useRefreshToken from '../../hooks/useRefreshToken';
import { BackgroundLoader } from "../../styles/Loaders";
import usePersist from "../../hooks/usePersist";

const PersistLogin = () => {
    // State to manage loading status
    const [isLoading, setIsLoading] = useState(true);

    // Custom hook to check if persistence is enabled
    const [persist] = usePersist();

    // Get the access token from the Redux store
    const accessToken = useSelector(selectToken);
    // Custom hook to refresh the token
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                // Attempt to refresh the token
                await refresh();
            } catch (error) {
                console.log(error);
            } finally {
                // Set loading to false regardless of the outcome
                setTimeout(() => {
                    setIsLoading(false);
                }, 600);
            }
        };

        // If there's no access token but persistence is enabled, try to refresh the token
        if (!accessToken && persist) {
            verifyRefreshToken();
        } else {
            // If access token exists or persistence is not enabled, set loading to false
            setTimeout(() => {
                    setIsLoading(false);
                }, 600);
        }
    }, [accessToken, persist, refresh]);

    return (
        <>
            {
                // If persistence is not enabled, render the child routes directly
                !persist
                    ? <Outlet />
                    : !isLoading
                        // If not loading, render the child routes
                        ? <Outlet />
                        // If loading, show the background loader
                        : <BackgroundLoader />
            }
        </>
    );
};

export default PersistLogin;
