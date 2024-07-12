import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';
import { constants } from '../../constants/constants.js';

import { Button, Box, MenuItem, Checkbox } from '@mui/material';
import { FormLabel, Input, Select } from '@mui/joy';

import DataTable from 'react-data-table-component';

export default function Permission() {

	useEffect(() => {
		try {
			axios.get(constants.GET_MENU_API)
				.then(response => {
					setMenus(response.data);
				})
		} catch (error) {
			console.error('Error fetching Menu:', error);
		}

	}, []);

	useEffect(() => {
		try {
			axios.get(constants.GET_ROLE_API)
				.then(response => {
					setGetRole(response.data)
				})
		} catch (error) {
			console.error('Error fetching Role:', error);
		}
	}, [])

	//ตัวแปร menu เก็บ menu จาก api + แสดง table
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(false);

	//ตัวแปร getRole เก็บ Role จาก api
	const [getRole, setGetRole] = useState([])

	//ตาราง table inside Modal
	const handlePermissionView = (rowMenuId) => {
		const updatedStatus = menus.map(menu =>
			menu.menuId === rowMenuId ? { ...menu, viewStatus: !menu.viewStatus } : menu
		)
		setMenus(updatedStatus)
	}

	const handlePermissionInsert = (rowMenuId) => {
		const updatedStatus = menus.map(menu =>
			menu.menuId === rowMenuId ? { ...menu, insertStatus: !menu.insertStatus } : menu
		)
		setMenus(updatedStatus)
	}

	const handlePermissionEdit = (rowMenuId) => {
		const updatedStatus = menus.map(menu =>
			menu.menuId === rowMenuId ? { ...menu, editStatus: !menu.editStatus } : menu
		)
		setMenus(updatedStatus)
	};

	const handlePermissionDel = (rowMenuId) => {
		const updatedStatus = menus.map(menu =>
			menu.menuId === rowMenuId ? { ...menu, delStatus: !menu.delStatus } : menu
		)
		setMenus(updatedStatus)
	};


	//ตาราง table outside Modal 
	const columnOutSide = [
		{
			name: '#',
			selector: row => row.roleId, // คอลัมน์จาก API
			sortable: true,
			width: "100px",
		}, {
			name: 'ชื่อสิทธิ์ผู้ใช้งาน',
			selector: row => row.roleName, // คอลัมน์จาก API
			sortable: true,
			width: "400px",
			// cell: row => <Box sx={{ backgroundColor: "red"}}>{row.roleName}</Box>, // ปรับแต่งการแสดงผลของเซลล์
		}, {
			name: 'สถานะ',
			cell: row => (
				// <div>
				// 	<select style={{ width: "200px" }}>
				// 		<option key={row.roleId} value={row.roleId}>Active</option>
				// 		<option key={row.roleId} value={row.roleId}>InActive</option>
				// 	</select>
				// </div>
				<Box>
					<Select
						placeholder={row.roleActive === 1 ? "Active" : "InActive"}
						size="sm"
						sx={{
							fontSize: 12,
							backgroundColor: "#fff",
						}}>
						<MenuItem
							sx={{ fontSize: 12 }}
							key={row.roleId}
							value={row.roleId}
						>
							Active
						</MenuItem>
						<MenuItem
							style={{ fontSize: 12 }}
							key={row.roleId}
							value={row.roleId}
						>
							InActive
						</MenuItem>
					</Select>
				</Box>
			),
		}, {
			name: 'จัดการสิทธิ์',
			cell: row => (
				<Link to={`editperm/${row.roleName}/${row.roleId}/1`}>
					<Box class="btn btn-sm btn-warning btn-set-per"><i class="far fa-edit"></i></Box>
				</Link>
			),
		}, {
			name: 'ลบ',
			cell: row => (
				<Box class="btn btn-sm btn-danger"><i class="fas fa-times"></i></Box>
			),
		},
	]

	return (
		<div>
			<ol className="breadcrumb float-xl-end">
				<li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
				<li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
				<li className="breadcrumb-item active">Blank Page</li>
			</ol>
			<h1 className="page-header">กำหนดสิทธิ์ผู้ใช้งาน <small>Setup Permission</small></h1>
			<Panel>
				<PanelHeader>กำหนดสิทธิ์ผู้ใช้งาน</PanelHeader>
				<PanelBody>

					<Link to="addperm">
						<Button variant="outlined" type='submit' sx={{ fontSize: 12 }}>เพิ่มสิทธิ์ผู้ใช้งาน</Button>
					</Link>

					<hr />

					<DataTable
						columns={columnOutSide}
						data={getRole}
						progressPending={loading}
						pagination
					/>

				</PanelBody>
			</Panel>
		</div >
	)
}