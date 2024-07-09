import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';

import { CustomButton } from '../../components/customButton/customButton.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GroupsIcon from '@mui/icons-material/Groups';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

import DataTable from 'react-data-table-component';

import EditPermission from './editPermission.jsx'

export default function Permission() {

	useEffect(() => {
		try {
			axios.get('http://zoneidea.dyndns-ip.com:5000/Menu/GetMenu')
				.then(response => {
					setMenus(response.data);
				})
		} catch (error) {
			console.error('Error fetching Menu:', error);
			setLoading(false);
		}

	}, []);

	useEffect(() => {
		try {
			axios.get('http://zoneidea.dyndns-ip.com:5000/Role/GetRole')
				.then(response => {
					setGetRole(response.data)
				})
		} catch (error) {
			console.error('Error fetching Role:', error);
		}
	}, [])

	//สร้าง Role + Permission เก็บลง db
	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post('http://zoneidea.dyndns-ip.com:5000/Role/AddRole', { roleName, menus, orgId: 1 })
			.then(response => {
				console.log('Role save on DB successfully', response);
			}).catch(error => {
				console.error("There was an error saving the Role!", error);
			})
	}

	//หน้าต่าง modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false)
	};

	//หน้าต่าง Edit modal
	// const [openEditModal, setOpenEditModal] = useState(false);
	// const handleOpenEditModal = () => setOpenEditModal(true);
	// const handleCloseEditModal = () => {
	// 	setOpenEditModal(false)
	// };

	const handleEditPermission = () => {
		return <EditPermission open={open} handleClose={handleClose} />
	}

	//ตัวแปร menu เก็บ menu จาก api + แสดง table
	const [menus, setMenus] = useState([]);
	const [loading, setLoading] = useState(false);

	//insert roleName ลง db
	const [roleName, setRoleName] = useState('')

	//ตัวแปร getRole เก็บ Role จาก api
	const [getRole, setGetRole] = useState([])

	//handle ชื่อ Role
	const handleChangeRole = (e) => {
		setRoleName(e.target.value)
	}

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

	const columns =
		[
			{
				name: 'รหัสเมนู',
				selector: row => row.menuId, // คอลัมน์จาก API
				sortable: true,
			}, {
				name: 'เมนู',
				selector: row => row.menuName, // คอลัมน์จาก API
				sortable: true,
				cell: row => <div>{row.menuName}</div>, // ปรับแต่งการแสดงผลของเซลล์
			}, {
				name: 'ดู',
				cell: row => (
					<div>
						<input
							type='checkbox'
							checked={row.viewStatus}
							onChange={() => handlePermissionView(row.menuId)}
						/>
					</div>
				),
			}, {
				name: 'เพิ่ม',
				cell: row => (
					<div>
						<input
							type='checkbox'
							checked={row.insertStatus}
							onChange={() => handlePermissionInsert(row.menuId)}
						/>
					</div>
				),
			}, {
				name: 'แก้ไข',
				cell: row => (
					<div>
						<input
							type='checkbox'
							checked={row.editStatus}
							onChange={() => handlePermissionEdit(row.menuId)}
						/>
					</div>
				),
			}, {
				name: 'ลบ',
				cell: row => (
					<div>
						<input
							type='checkbox'
							checked={row.delStatus}
							onChange={() => handlePermissionDel(row.menuId)}
						/>
					</div>
				),
			},
		]

	//ตาราง table outside Modal 
	const columnOutSide = [
		{
			name: '#',
			selector: row => row.roleId, // คอลัมน์จาก API
			sortable: true,
			width: "150px",
		}, {
			name: 'ชื่อสิทธิ์ผู้ใช้งาน',
			selector: row => row.roleName, // คอลัมน์จาก API
			sortable: true,
			cell: row => <div>{row.roleName}</div>, // ปรับแต่งการแสดงผลของเซลล์
		}, {
			name: 'สถานะ',
			cell: row => (
				<div>
					<select style={{ width: "200px" }}>
						<option key={row.roleId} value={row.roleId}>Active</option>
						<option key={row.roleId} value={row.roleId}>InActive</option>
					</select>
				</div>
			),
		}, {
			name: 'จัดการสิทธิ์',
			cell: row => (
				<div
					onClick={() => (
						<EditPermission
							open={setOpen(true)}
							handleClose={handleClose}
							row={row.roleId}
						/>)
					}>
					<EditNoteIcon type="button" />
				</div>
			),
		}, {
			name: 'ลบ',
			cell: row => (
				<div>
					{/* <input
						type='checkbox'
						checked={row.delStatus}
						onChange={() => handlePermissionDel(row.menuId)}
					/> */}
					<DeleteIcon type="button" />
				</div>
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
					{/* Modal */}
					<div>
						<CustomButton type="button" onClick={handleOpen}
							style={{
								fontSize: 12,
								color: "black",
							}}>
							เพิ่มสิทธิ์ผู้ใช้งาน
						</CustomButton>

						{/* Inside Modal */}
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
							style={{
								position: "fixed",
								zIndex: 1300,
								inset: 0,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								backgroundColor: "rgb(0 0 0 / 0.7)",
							}}
						>
							<div style={{
								backgroundColor: "white",
								width: "50%",
								padding: "24px"
							}}>
								<Box style={{
									display: "flex",
									justifyContent: "space-between",
								}}>

									<Box style={{ display: "flex" }}>
										<GroupsIcon />
										<Typography style={{ paddingLeft: 15 }}>เพิ่มสิทธิ์ผู้ใช้งาน</Typography>
									</Box>
									<CloseIcon
										onClick={handleClose}
										style={{
											cursor: "pointer",
											fontSize: 20
										}}
									/>
								</Box>
								<hr />

								<form onSubmit={handleSubmit}>
									<p id="unstyled-modal-description" className="modal-description">

										<Box style={{ marginTop: 40, marginBottom: 20 }}>
											<label style={{
												width: "20%",
												textAlign: "right",
												display: "inline-block"
											}}>
												ชื่อสิทธิ์ผู้ใช้งาน
												<span style={{ color: "red" }}> *</span></label>
											<input
												style={{ width: "70%", marginLeft: 10 }}
												placeholder='Enter roleName'
												type='text'
												name='roleName'
												value={roleName}
												onChange={handleChangeRole}
											/>
										</Box>

									</p>

									<hr />

									{/* Table inside Modal */}
									<DataTable
										columns={columns}
										data={menus}
										progressPending={loading}
										pagination
									/>
									{/* Table inside Modal */}

									<Box style={{
										display: "flex",
										justifyContent: "center",
										gap: 10,
										marginTop: 10,
									}}>
										<Button
											variant="outlined"
											style={{ width: 100 }}
											onClick={handleClose}
										>
											ยกเลิก
										</Button>
										<Button
											variant="contained"
											style={{ width: 100 }}
											type="submit"
										>
											บันทึก
										</Button>
									</Box>
								</form>
							</div>
						</Modal>
					</div>
					{/* Inside Modal */}

					{/* Outside Modal */}
					<hr />
					<DataTable
						columns={columnOutSide}
						data={getRole}
						progressPending={loading}
						pagination
					/>
					{/* Outside Modal */}

				</PanelBody>
			</Panel>
		</div >
	)
}