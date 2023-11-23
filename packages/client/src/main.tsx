import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Home from './pages/home-page/home-page.tsx';
import SignUp from './registration-page/registration-page.tsx';
import LogIn from './pages/login-page/login-page.tsx';

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
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
