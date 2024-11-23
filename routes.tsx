import { createBrowserRouter } from 'react-router-dom';

import Home from './src/pages/Home/index';
import Clients from './src/pages/Clients/index';
import Accounts from './src/pages/Accounts/index';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/home',
        element: <Home />,
    },
    {
        path: '/clients',
        element: <Clients />,
    },
    {
        path:'/accounts',
        element: <Accounts />,
    }
]);

export default router;
