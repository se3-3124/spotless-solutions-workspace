import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
// import './index.css'
import Home from './home-page/home-page.tsx';
import SignUp from './registration-page/registration-page.tsx';
import LogIn from './login-page/login-page.tsx';
import AnotherWorld from './pages/AnotherWorld.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/another-world/:id",
        element: <AnotherWorld />
    },
    {
      path: "/SignUp",
      element: <SignUp />
    },
    {
      path: "/LogIn",
      element: <LogIn />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
