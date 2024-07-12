import { React } from 'react';
import App from '../app.jsx';

import Home from '../pages/home/Home.jsx';
import Error from '../pages/error/Error.jsx';

import Permission from '../pages/permission/Permission.jsx'
import AddPermission from '../pages/permission/AddPermission.jsx'
import EditPermission from '../pages/permission/EditPermission.jsx'

import Users from '../pages/users/Users.jsx'
import AddUsers from '../pages/users/AddUsers.jsx';

import Test from '../pages/test/Test.jsx'

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
    	{ path: 'settings/test', element: <Test /> },
    	{ path: 'settings/perm', element: <Permission /> },
    	{ path: 'settings/perm/addperm', element: <AddPermission /> },
    	{ path: 'settings/perm/editperm/:roleName/:roleId/:orgId', element: <EditPermission /> },
    	{ path: 'settings/users', element: <Users /> },
    	{ path: 'settings/users/addusers', element: <AddUsers /> },
		]
  },
];


export default AppRoute;