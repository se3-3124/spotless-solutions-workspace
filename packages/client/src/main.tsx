import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import './index.css'
import HelloWorld from './pages/HelloWorld';
import AnotherWorld from './pages/AnotherWorld.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HelloWorld />,
    },
    {
        path: "/another-world/:id",
        element: <AnotherWorld />
    }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
