import { React, useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';
import Button from '@mui/material/Button';
import { CustomButton } from '../../components/customButton/customButton.jsx';

import DataTable from 'react-data-table-component';

function Permission() {
	//หน้าต่าง modal
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	//เรียกข้อมูลจาก api + table
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(false);

	//form insert ข้อมูลลง db
	const [roleName, setRoleName] = useState('')

	useEffect(() => {
		axios.get('http://zoneidea.dyndns-ip.com:5000/Menu/GetMenu')
			.then(response => {
				setMenu(response.data);
			})
			.catch(error => {
				console.error('Error fetching data:', error);
				setLoading(false);
			});
	}, []);

	//ตาราง table
	const handlePermissionView = (row) => {
		const updateStatus = menu.map(item =>
			item.menuId === row ? { ...item, viewStatus: !item.viewStatus } : item
		)
		setMenu(updateStatus)
	}

	const handlePermissionInsert = (row) => {
		const updateStatus = menu.map(item =>
			item.menuId === row ? { ...item, insertStatus: !item.insertStatus } : item
		)
		setMenu(updateStatus)
	}

	const handlePermissionEdit = (row) => {
		const updateStatus = menu.map(item =>
			item.menuId === row ? { ...item, editStatus: !item.editStatus } : item
		)
		setMenu(updateStatus)
	};

	const handlePermissionDel = (row) => {
		const updateStatus = menu.map(item =>
			item.menuId === row ? { ...item, delStatus: !item.delStatus } : item
		)
		setMenu(updateStatus)
	};

	const columns =
		[
			{
				name: 'รหัสเมนู',
				selector: row => row.menuId, // คอลัมน์จาก API
				sortable: true,
			},
			{
				name: 'เมนู',
				selector: row => row.menuName, // คอลัมน์จาก API
				sortable: true,
				cell: row => <div>{row.menuName}</div>, // ปรับแต่งการแสดงผลของเซลล์
			},
			{
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
			},
			{
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
			},
			{
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
			},
			{
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

	//จัดการ from
	const handleChangeRoleName = (e) => {
		setRoleName(e.target.value)
		console.log(roleName);
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post('http://zoneidea.dyndns-ip.com:5000/Role/AddRole', { roleName, menu, orgId: 1 })
			.then(response => {
				console.log('Role save on DB successfully', response);
			}).catch(error => {
				console.error("There was an error saving the data!", error);
			})
	}

	//Modal
	const Backdrop = forwardRef((props, ref) => {
		const { open, className, ...other } = props;
		return (
			<div
				className={clsx({ 'base-Backdrop-open': open }, className)}
				ref={ref}
				{...other}
			/>
		);
	});

	Backdrop.propTypes = {
		className: PropTypes.string.isRequired,
		open: PropTypes.bool,
	};

	const grey = {
		50: '#F3F6F9',
		100: '#E5EAF2',
		200: '#DAE2ED',
		300: '#C7D0DD',
		400: '#B0B8C4',
		500: '#9DA8B7',
		600: '#6B7A90',
		700: '#434D5B',
		800: '#303740',
		900: '#1C2025',
	};

	const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

	const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.7);
    -webkit-tap-highlight-color: transparent;
  `;

	const ModalContent = styled('div')(
		({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 8px;
      border: 1px solid ${grey[200]};
      box-shadow: 0 4px 12px rgb(0 0 0 / 0.2);
      padding: 24px;
      color: ${grey[900]};
  
      & .modal-title {
        margin: 0;
        line-height: 1.5rem;
        margin-bottom: 8px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${grey[800]};
        margin-bottom: 4px;
      }
    `,
	);

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
						<Modal
							aria-labelledby="unstyled-modal-title"
							aria-describedby="unstyled-modal-description"
							open={open}
							slots={{ backdrop: StyledBackdrop }}
						>
							<ModalContent sx={{ width: 700 }}>
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
											cursor: "pointer"
										}}
									/>
								</Box>
								<hr />

								<form onSubmit={handleSubmit}>
									<p id="unstyled-modal-description" className="modal-description">
										<Box>
											<label style={{
												width: "20%",
												textAlign: "right",
												display: "inline-block"
											}}>ชื่อสิทธิ์<span style={{ color: "red" }}> *</span></label>
											<input
												style={{ width: "70%", marginLeft: 10 }}
												type='text'
												name='roleName'
												value={roleName}
												onChange={handleChangeRoleName}
											/>
										</Box>
									</p>
									<hr />

									{/* Table */}
									<DataTable
										columns={columns}
										data={menu}
										progressPending={loading}
										pagination
									/>
									{/* Table */}

									<Box style={{
										display: "flex",
										justifyContent: "center",
										gap: 10,
										marginTop: 10,
									}}>
										<Button variant="outlined" style={{ width: 100 }}>ยกเลิก</Button>
										<Button
											type='submit'
											variant="contained"
											style={{ width: 100 }}
										>
											บันทึก
										</Button>
									</Box>
								</form>
							</ModalContent>
						</Modal>
					</div>
					{/* Modal */}
				</PanelBody>
			</Panel>
		</div >
	)
}

export default Permission;