import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from "react-router-dom";
import AppRoute from './config/app-route.js';

// bootstrap
import 'bootstrap';

// css
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './scss/react.scss';


const container = document.getElementById('root');
const root = createRoot(container);
function App() {
	let element = useRoutes(AppRoute);
	
	return element;
}

root.render(
  <BrowserRouter basename="/WMS">
  	<App />
  </BrowserRouter>
);


// {
//     "roleName": "testRole",
//     "menu": [
//         {
//             "menuId": "ST-002",
//             "menuName": "สิทธิ์การใช้งาน",
//             "menuParentId": "ST-001",
//             "insertStatus": false,
//             "editStatus": false,
//             "delStatus":false
//         },
//         {
//             "menuId": "ST-003",
//             "menuName": "ผู้ใช้งาน",
//             "menuParentId": "ST-001",
//             "insertStatus": false,
//             "editStatus": false,
//             "delStatus":0
//         }
//     ]
// }
