import './App.css';

import React from 'react';

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom';

import Error from './pages/Error/Error';
import Explore from './pages/Explore/Explore';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Signin from './pages/Signin/Signin';

const Layout = () => {
    return (
        <div className="md:w-8/12 mx-auto">
            <h1>Navbar</h1>
            <Outlet></Outlet>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error />,
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/profile/:id',
                element: <Profile />
            },
            {
                path: '/explore',
                element: <Explore />
            },
            {
                path: '/signin',
                element: <Signin />
            },
            {
                path: '/signout',
                element: <Signin />
            },
        ],
    }
]);

const App = () => {
    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;
