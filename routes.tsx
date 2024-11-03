import { createBrowserRouter } from 'react-router-dom';

import Home from './src/pages/Home/index';
import Clients from './src/pages/Clients/index';

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
]);

export default router;
