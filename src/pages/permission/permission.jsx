import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { editRoleStatus } from '../../features/permission/permissionSlice.js'
import { constants } from '../../constants/constants.js';

import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { Button, Box, MenuItem, Checkbox, FormControl, InputLabel } from '@mui/material';
import { FormLabel, Input, Select } from '@mui/joy';
import DataTable from 'react-data-table-component';

export default function Permission() {
	const dispatch = useDispatch()

	const [loading, setLoading] = useState(false);
	const [addRequestStatus, setAddRequestStatus] = useState('idle')

	const [allRole, setAllRole] = useState([]);
	// console.log(`allRole`, allRole);

	const [roleId, setRoleId] = useState([]);
	const [roleActive, setRoleActive] = useState([]);
	// console.log(`roleId`, roleId);
	// console.log(`roleActive`, roleActive);

	useEffect(() => {
		const ids = allRole.map((role) => role.roleId);
		setRoleId(ids);
	}, [allRole]);

	useEffect(() => {
		const status = allRole.map((role) => role.roleActive);
		setRoleActive(status);
	}, [allRole]);

	useEffect(() => {
		const getData = async () => {
			try {
				axios.get(constants.GET_ROLE_API)
					.then(response => {
						setAllRole(response.data);
					})
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		getData()
	}, [])

	const handleSelectChange = (rowId) => {
		const updatedRoleStatus = allRole.map(role =>
			role.roleId === rowId ? { ...role, roleActive: !role.roleActive } : role
		)
		setAllRole(updatedRoleStatus)
		console.log(`updatedRoleStatus`, updatedRoleStatus);
		onSavePermission()
	}

	const onSavePermission = async () => {
		try {
			const resultAction = await dispatch(
				editRoleStatus({ roleId, roleActive })
			)
			unwrapResult(resultAction)
			console.log(`SuccessFully to edit status`);
		} catch (error) {
			console.error(`Failed to edit status`, error);
		}
	}

	const column = [
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
				<div class='dropdown dropdown-toggle'>
					<select
						class="form-control form-control-sm selectpicker ddlStatus btn-update dropdown-toggle"
						style={{ width: "100%" }}
						onChange={() => handleSelectChange(row.roleId)}
					>
						<option value={row.roleActive}>Active</option>
						<option value={row.roleActive}>InActive</option>
					</select>
				</div>
			),
		}, {
			name: 'จัดการสิทธิ์',
			cell: row => (
				<Link to={`editperm/${row.roleId}/1`}>
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
						<Button variant="contained" type='submit' sx={{ fontSize: 12 }}>เพิ่มสิทธิ์ผู้ใช้งาน</Button>
					</Link>

					<hr />

					<DataTable
						columns={column}
						data={allRole}
						progressPending={loading}
						pagination
					/>

				</PanelBody>
			</Panel>
		</div >
	)
}