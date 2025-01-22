import { createBrowserRouter } from 'react-router-dom';
import LoginPage from '../pages/authentication/LoginPage';
import MainLayout from '../layouts/MainLayout';
import RegisterPage from '../pages/authentication/RegisterPage';
import ProtectedRoutes from '../components/accessControl/ProtectedRoutes';
import IsAuthenticated from '../components/accessControl/IsAuthenticated';
import PersistLogin from '../components/accessControl/PersistLogin';
import NotFoundPage from '../pages/authentication/NotFoundPage';
import Unauthorized from '../pages/authentication/Unauthorized';

// user imports
import AllApplications from '../pages/user/AllApplications';


const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <IsAuthenticated>
                <LoginPage />
            </IsAuthenticated>
        ),
    },
    {
        path: "/register",
        element: (
            <IsAuthenticated>
                <RegisterPage />
            </IsAuthenticated>
        ),
    },

    // user routes
    {
        path: "/",
        element: <MainLayout />,
        children: [

            {
                path: "",
                element: <PersistLogin />,
                children: [
                    {
                        path: "",
                        element: <ProtectedRoutes roles={['user', 'admin']} />,
                        children: [
                            {
                                path: "/",
                                element: <AllApplications />
                            }
                        ]
                    },
                ],
            },
        ],
    },

   
    // other routes
    {
        path: "unauthorized",
        element: <Unauthorized />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export default router;
