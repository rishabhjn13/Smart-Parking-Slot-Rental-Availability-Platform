import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/auth/login',
        element: <LoginPage />,
    },
    {
        path: '/auth/signup',
        element: <SignUpPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    }
])

export default router