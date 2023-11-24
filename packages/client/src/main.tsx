import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/home-page/home-page.tsx';
import SignUp from './pages/registration-page/registration-page.tsx';
import LogIn from './pages/login-page/login-page.tsx';
import OAuthGoogleFailure from './pages/oauth/google/Failure.tsx';
import OAuthGoogleSuccess from './pages/oauth/google/Success.tsx';
import OAuthGoogleSuccessSignup from './pages/oauth/google/SignUpSuccess.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import RecoveryPrompt from './pages/password-recovery/recovery-prompt.tsx';
import RecoveryRecover from './pages/password-recovery/recovery-recover.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <LogIn />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/auth/google/register/success",
        element: <OAuthGoogleSuccessSignup />
    },
    {
        path: "/auth/google/register/failure",
        element: <OAuthGoogleFailure />
    },
    {
        path: "/auth/google/success",
        element: <OAuthGoogleSuccess />
    },
    {
        path: "/auth/google/failure",
        element: <OAuthGoogleFailure />
    },
    {
        path: "/recovery",
        element: <RecoveryPrompt />
    },
    {
        path: "/recovery/change",
        element: <RecoveryRecover />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />,
)
