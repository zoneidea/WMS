import React from 'react';
import App from '../app.jsx';

import Home from '../pages/home/home.jsx';
import Error from '../pages/error/error.jsx';

import Permission from '../pages/permission/permission.jsx'
import Users from '../pages/users/users.jsx'
import Test from '../pages/test/test.jsx'

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Home /> },
    	{ path: '*', element: <Error /> },
		]
  },{
    path: '*', 
    element: <App />,
    children: [
    	{ path: 'settings/permission', element: <Permission /> },
    	{ path: 'settings/users', element: <Users /> },
    	{ path: 'settings/test', element: <Test /> },
		]
  },
];


export default AppRoute;