// import { React, useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
// import axios from 'axios';


// import { CustomButton } from '../../components/customButton/customButton.jsx';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import GroupsIcon from '@mui/icons-material/Groups';
// import EditNoteIcon from '@mui/icons-material/EditNote';
// import DeleteIcon from '@mui/icons-material/Delete';

// import DataTable from 'react-data-table-component';

// import EditPermission from '../permission/EditPermission.jsx'

// export default function Permission() {

// 	useEffect(() => {
// 		try {
// 			axios.get('http://zoneidea.dyndns-ip.com:5000/Menu/GetMenu')
// 				.then(response => {
// 					setMenus(response.data);
// 				})
// 		} catch (error) {
// 			console.error('Error fetching Menu:', error);
// 		}

// 	}, []);

// 	useEffect(() => {
// 		try {
// 			axios.get('http://zoneidea.dyndns-ip.com:5000/Role/GetRole')
// 				.then(response => {
// 					setGetRole(response.data)
// 				})
// 		} catch (error) {
// 			console.error('Error fetching Role:', error);
// 		}
// 	}, [])

// 	//สร้าง Role + Permission เก็บลง db
// 	const handleSubmit = (e) => {
// 		e.preventDefault()
// 		axios.post('http://zoneidea.dyndns-ip.com:5000/Role/AddRole', { roleName, menus, orgId: 1 })
// 			.then(response => {
// 				console.log('Role save on DB successfully', response);
// 			}).catch(error => {
// 				console.error("There was an error saving the Role!", error);
// 			})
// 	}

// 	//หน้าต่าง modal
// 	const [open, setOpen] = useState(false);
// 	const handleOpen = () => setOpen(true);
// 	const handleClose = () => {
// 		setOpen(false)
// 	};

// 	//หน้าต่าง Edit modal
// 	const [openEditModal, setOpenEditModal] = useState(false);
// 	const handleOpenEditModal = () => setOpenEditModal(true);
// 	const handleCloseEditModal = () => {
// 		setOpenEditModal(false)
// 	};

// 	//ตัวแปร menu เก็บ menu จาก api + แสดง table
// 	const [menus, setMenus] = useState([]);
// 	console.log('menus', menus);
// 	const [loading, setLoading] = useState(false);

// 	//ตัวแปร getRole เก็บ Role จาก api
// 	const [getRole, setGetRole] = useState([])

// 	//insert roleName ลง db
// 	const [roleName, setRoleName] = useState('')

// 	//handle ชื่อ Role
// 	const handleChangeRole = (e) => {
// 		setRoleName(e.target.value)
// 	}

// 	//ตาราง table inside Modal
// 	const handlePermissionView = (rowMenuId) => {
// 		const updatedStatus = menus.map(menu =>
// 			menu.menuId === rowMenuId ? { ...menu, viewStatus: !menu.viewStatus } : menu
// 		)
// 		setMenus(updatedStatus)
// 	}

// 	const handlePermissionInsert = (rowMenuId) => {
// 		const updatedStatus = menus.map(menu =>
// 			menu.menuId === rowMenuId ? { ...menu, insertStatus: !menu.insertStatus } : menu
// 		)
// 		setMenus(updatedStatus)
// 	}

// 	const handlePermissionEdit = (rowMenuId) => {
// 		const updatedStatus = menus.map(menu =>
// 			menu.menuId === rowMenuId ? { ...menu, editStatus: !menu.editStatus } : menu
// 		)
// 		setMenus(updatedStatus)
// 	};

// 	const handlePermissionDel = (rowMenuId) => {
// 		const updatedStatus = menus.map(menu =>
// 			menu.menuId === rowMenuId ? { ...menu, delStatus: !menu.delStatus } : menu
// 		)
// 		setMenus(updatedStatus)
// 	};

// 	const columns =
// 		[
// 			{
// 				name: 'รหัสเมนู',
// 				selector: row => row.menuId, // คอลัมน์จาก API
// 				sortable: true,
// 			}, {
// 				name: 'เมนู',
// 				selector: row => row.menuName, // คอลัมน์จาก API
// 				sortable: true,
// 				cell: row => <div>{row.menuName}</div>, // ปรับแต่งการแสดงผลของเซลล์
// 			}, {
// 				name: 'ดู',
// 				cell: row => (
// 					<div>
// 						<input
// 							type='checkbox'
// 							checked={row.viewStatus}
// 							onChange={() => handlePermissionView(row.menuId)}
// 						/>
// 					</div>
// 				),
// 			}, {
// 				name: 'เพิ่ม',
// 				cell: row => (
// 					<div>
// 						<input
// 							type='checkbox'
// 							checked={row.insertStatus}
// 							onChange={() => handlePermissionInsert(row.menuId)}
// 						/>
// 					</div>
// 				),
// 			}, {
// 				name: 'แก้ไข',
// 				cell: row => (
// 					<div>
// 						<input
// 							type='checkbox'
// 							checked={row.editStatus}
// 							onChange={() => handlePermissionEdit(row.menuId)}
// 						/>
// 					</div>
// 				),
// 			}, {
// 				name: 'ลบ',
// 				cell: row => (
// 					<div>
// 						<input
// 							type='checkbox'
// 							checked={row.delStatus}
// 							onChange={() => handlePermissionDel(row.menuId)}
// 						/>
// 					</div>
// 				),
// 			},
// 		]

// 	//ตาราง table outside Modal 
// 	const columnOutSide = [
// 		{
// 			name: '#',
// 			selector: row => row.roleId, // คอลัมน์จาก API
// 			sortable: true,
// 			width: "150px",
// 		}, {
// 			name: 'ชื่อสิทธิ์ผู้ใช้งาน',
// 			selector: row => row.roleName, // คอลัมน์จาก API
// 			sortable: true,
// 			cell: row => <div>{row.roleName}</div>, // ปรับแต่งการแสดงผลของเซลล์
// 		}, {
// 			name: 'สถานะ',
// 			cell: row => (
// 				<div>
// 					<select style={{ width: "200px" }}>
// 						<option key={row.roleId} value={row.roleId}>Active</option>
// 						<option key={row.roleId} value={row.roleId}>InActive</option>
// 					</select>
// 				</div>
// 			),
// 		}, {
// 			name: 'จัดการสิทธิ์',
// 			cell: row => (
// 				<div onClick={() => <EditPermission openEditModals={true} />}>
// 					<EditNoteIcon type="button" />
// 				</div>
// 			),
// 		}, {
// 			name: 'ลบ',
// 			cell: row => (
// 				<div>
// 					{/* <input
// 						type='checkbox'
// 						checked={row.delStatus}
// 						onChange={() => handlePermissionDel(row.menuId)}
// 					/> */}
// 					<DeleteIcon type="button" />
// 				</div>
// 			),
// 		},
// 	]

// 	return (
// 		<div>
// 			<ol className="breadcrumb float-xl-end">
// 				<li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
// 				<li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
// 				<li className="breadcrumb-item active">Blank Page</li>
// 			</ol>
// 			<h1 className="page-header">กำหนดสิทธิ์ผู้ใช้งาน <small>Setup Permission</small></h1>
// 			<Panel>
// 				<PanelHeader>กำหนดสิทธิ์ผู้ใช้งาน</PanelHeader>
// 				<PanelBody>
// 					{/* Inside Modal */}
// 					<div>
// 						<CustomButton type="button" onClick={handleOpen}
// 							style={{
// 								fontSize: 12,
// 								color: "black",
// 							}}>
// 							เพิ่มสิทธิ์ผู้ใช้งาน
// 						</CustomButton>

// 						{/* Inside Modal */}
// 						<Modal
// 							open={open}
// 							onClose={handleClose}
// 							aria-labelledby="modal-modal-title"
// 							aria-describedby="modal-modal-description"
// 							style={{
// 								position: "fixed",
// 								zIndex: 1300,
// 								inset: 0,
// 								display: "flex",
// 								alignItems: "center",
// 								justifyContent: "center",
// 								backgroundColor: "rgb(0 0 0 / 0.7)",
// 							}}
// 						>
// 							<div style={{
// 								backgroundColor: "white",
// 								width: "50%",
// 								padding: "24px"
// 							}}>
// 								<Box style={{
// 									display: "flex",
// 									justifyContent: "space-between",
// 								}}>

// 									<Box style={{ display: "flex" }}>
// 										<GroupsIcon />
// 										<Typography style={{ paddingLeft: 15 }}>เพิ่มสิทธิ์ผู้ใช้งาน</Typography>
// 									</Box>
// 									<CloseIcon
// 										onClick={handleClose}
// 										style={{
// 											cursor: "pointer",
// 											fontSize: 20
// 										}}
// 									/>
// 								</Box>
// 								<hr />

// 								<form onSubmit={handleSubmit}>
// 									<p id="unstyled-modal-description" className="modal-description">

// 										<Box style={{ marginTop: 40, marginBottom: 20 }}>
// 											<label style={{
// 												width: "20%",
// 												textAlign: "right",
// 												display: "inline-block"
// 											}}>
// 												ชื่อสิทธิ์ผู้ใช้งาน
// 												<span style={{ color: "red" }}> *</span></label>
// 											<input
// 												style={{ width: "70%", marginLeft: 10 }}
// 												placeholder='Enter roleName'
// 												type='text'
// 												name='roleName'
// 												value={roleName}
// 												onChange={handleChangeRole}
// 											/>
// 										</Box>

// 									</p>

// 									<hr />

// 									{/* Table inside Modal */}
// 									<DataTable
// 										columns={columns}
// 										data={menus}
// 										progressPending={loading}
// 										pagination
// 									/>
// 									{/* Table inside Modal */}

// 									<Box style={{
// 										display: "flex",
// 										justifyContent: "center",
// 										gap: 10,
// 										marginTop: 10,
// 									}}>
// 										<Button
// 											variant="outlined"
// 											style={{ width: 100 }}
// 											onClick={handleClose}
// 										>
// 											ยกเลิก
// 										</Button>
// 										<Button
// 											variant="contained"
// 											style={{ width: 100 }}
// 											type="submit"
// 										>
// 											บันทึก
// 										</Button>
// 									</Box>
// 								</form>
// 							</div>
// 						</Modal>
// 					</div>
// 					{/* Inside Modal */}

// 					{/* Outside Modal */}
// 					<hr />
// 					<DataTable
// 						columns={columnOutSide}
// 						data={getRole}
// 						progressPending={loading}
// 						pagination
// 					/>
// 					{/* Outside Modal */}

// 				</PanelBody>
// 			</Panel>
// 		</div >
// 	)
// }



///Users

// import { React, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
// import axios from 'axios';

// import { CustomButton } from '../../components/customButton/customButton.jsx';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import CloseIcon from '@mui/icons-material/Close';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// export default function Users() {

//   //เรียก role จาก api เก็บลงตัวแปร role
//   useEffect(() => {
//     const getData = async () => {
//       try {
//         axios.get('http://zoneidea.dyndns-ip.com:5000/Role/GetRole')
//           .then(response => {
//             setGetRoles(response.data);
//           })
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     getData()
//   }, [])

//   //เก็บ userForm ลง db
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     axios.post('http://zoneidea.dyndns-ip.com:5000/User/AddUser', formUser)
//       .then(response => {
//         console.log('User save on DB successfully', response);
//       }).catch(error => {
//         console.error("There was an error saving the User!", error);
//       })
//     console.log('formUser', formUser);
//   }

//   //ตัวแปร role เก็บ role จาก api
//   const [getRoles, setGetRoles] = useState([])
//   const [selectedRole, setSelectedRole] = useState('')
//   // console.log('Roles', getRoles);

//   //Modal
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   //ตัวแปร formUsers เก็บ formUsers ลง db
//   const [formUser, setFormUser] = useState({
//     usersFName: "",
//     usersLName: "",
//     roleId: null,
//     usersUsername: "",
//     usersEmail: "",
//     usersPassword: ""
//   })
//   // console.log('formUser', formUser);

//   const handleChangeformUsers = (e) => {
//     const { name, value } = e.target
//     setFormUser((prevState) => ({
//       ...prevState,
//       [name]: value
//     }))
//   }

//   const handleSelectedRole = (e) => {
//     setSelectedRole(e.target.value)
//     const confirmRole = selectedRole

//     setFormUser((prevState) => ({
//       ...prevState,
//       roleId: confirmRole
//     }))
//   }

//   return (
//     <div>
//       <ol className="breadcrumb float-xl-end">
//         <li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
//         <li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
//         <li className="breadcrumb-item active">Blank Page</li>
//       </ol>
//       <h1 className="page-header">ผู้ใช้งาน <small>Setup Users</small></h1>
//       <Panel>
//         <PanelHeader>ผู้ใช้งาน</PanelHeader>
//         <PanelBody>
//           <CustomButton type="button" onClick={handleOpen}
//             style={{
//               fontSize: 12,
//               color: "black",
//             }}>
//             เพิ่มผู้ใช้งาน
//           </CustomButton>

//           {/* Inside Modal */}
//           <Modal
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="modal-modal-title"
//             aria-describedby="modal-modal-description"
//             style={{
//               position: "fixed",
//               zIndex: 1300,
//               inset: 0,
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "rgb(0 0 0 / 0.7)",
//             }}
//           >
//             <div style={{
//               backgroundColor: "white",
//               width: "50%",
//               padding: "24px"
//             }}>
//               <Box style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//               }}>

//                 <Box style={{ display: "flex" }}>
//                   <PersonAddIcon />
//                   <Typography style={{ paddingLeft: 15 }}>เพิ่มผู้ใช้งาน</Typography>
//                 </Box>
//                 <CloseIcon
//                   onClick={handleClose}
//                   style={{
//                     cursor: "pointer",
//                     fontSize: 20
//                   }}
//                 />
//               </Box>
//               <hr />
//               <form onSubmit={handleSubmit}>
//                 <p id="unstyled-modal-description" className="modal-description">
//                   <Box style={{ marginTop: 40, marginBottom: 20 }}>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       ชื่อจริง
//                       <span style={{ color: "red" }}> *</span></label>
//                     <input
//                       style={{ width: "70%", marginLeft: 10 }}
//                       placeholder='Enter Firstname'
//                       type='text'
//                       name='usersFName'
//                       value={formUser.usersFName}
//                       onChange={handleChangeformUsers}
//                     />
//                   </Box>
//                   <Box style={{ marginBottom: 20 }}>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       นามสกุล
//                       <span style={{ color: "red" }}> *</span></label>
//                     <input
//                       style={{ width: "70%", marginLeft: 10 }}
//                       placeholder='Enter Lastname'
//                       type='text'
//                       name='usersLName'
//                       value={formUser.usersLName}
//                       onChange={handleChangeformUsers}
//                     />
//                   </Box>
//                   <Box style={{ marginBottom: 20 }}>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       ระดับ
//                       <span style={{ color: "red" }}> *</span>
//                     </label>
//                     <select
//                       onChange={handleSelectedRole}
//                       style={{
//                         width: "70%",
//                         height: 30,
//                         marginLeft: 10
//                       }}>
//                       {getRoles.map((getRole) => (
//                         <option key={getRole.roleId} value={getRole.roleId}>{getRole.roleName}</option>
//                       ))
//                       }
//                     </select>
//                   </Box>
//                   <Box style={{ marginBottom: 20 }}>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       ชื่อผู้ใช้
//                       <span style={{ color: "red" }}> *</span></label>
//                     <input
//                       style={{ width: "70%", marginLeft: 10 }}
//                       placeholder='Enter Username'
//                       type='text'
//                       name='usersUsername'
//                       value={formUser.usersUsername}
//                       onChange={handleChangeformUsers}
//                     />
//                   </Box>
//                   <Box style={{ marginBottom: 20 }}>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       อีเมล์
//                       <span style={{ color: "red" }}>&nbsp;&nbsp;</span></label>
//                     <input
//                       style={{ width: "70%", marginLeft: 10 }}
//                       placeholder='Enter Email'
//                       type='email'
//                       name='usersEmail'
//                       value={formUser.usersEmail}
//                       onChange={handleChangeformUsers}
//                     />
//                   </Box>
//                   <Box>
//                     <label style={{
//                       width: "20%",
//                       textAlign: "right",
//                       display: "inline-block"
//                     }}>
//                       รหัสผ่าน
//                       <span style={{ color: "red" }}> *</span></label>
//                     <input
//                       style={{ width: "70%", marginLeft: 10, marginBottom: 20 }}
//                       placeholder='Enter Password'
//                       type='password'
//                       name='usersPassword'
//                       value={formUser.usersPassword}
//                       onChange={handleChangeformUsers}
//                     />
//                   </Box>

//                 </p>

//                 <Box style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   gap: 10,
//                   marginTop: 10,
//                 }}>
//                   <Button
//                     variant="outlined"
//                     style={{ width: 100 }}
//                     onClick={handleClose}
//                   >ยกเลิก</Button>
//                   <Button
//                     variant="contained"
//                     style={{ width: 100 }}
//                     type="submit"
//                   >บันทึก</Button>
//                 </Box>
//               </form>

//             </div>
//           </Modal>
//           {/* Inside Modal */}

//           <hr />

//           {/* Outside Modal */}
//           {/* Outside Modal */}

//         </PanelBody>
//       </Panel>
//     </div >
//   )
// }

// import { useForm } from "react-hook-form";

// export default function Test() {
// 	const { register, formState: { errors }, handleSubmit } = useForm();
// 	const onSubmit = (data) => console.log(data);
	
// 	return (
// 	  <form onSubmit={handleSubmit(onSubmit)}>
// 		<input 
// 		  {...register("firstName", { required: true })} 
// 		  aria-invalid={errors.firstName ? "true" : "false"} 
// 		/>
// 		{errors.firstName?.type === 'required' && <p role="alert">First name is required</p>}
  
// 		<input 
// 		  {...register("mail", { required: "Email Address is required" })} 
// 		  aria-invalid={errors.mail ? "true" : "false"} 
// 		/>
// 		{errors.mail && <p role="alert">{errors.mail?.message}</p>}
		
// 		<input type="submit" />
// 	  </form>
// 	);
//   }

// import { useForm, Controller } from "react-hook-form";
// import { TextField, Checkbox } from '@mui/material';

// export default function Test() {
//   const { handleSubmit, control, reset } = useForm({
//     defaultValues: {
//       checkbox: false,
//     }
//   });
//   const onSubmit = data => console.log(data);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="checkbox"
//         control={control}
//         rules={{ required: true }}
//         render={({ field }) => <Checkbox {...field} />}
//       />
//       <input type="submit" />
//     </form>
//   );
// }

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required(),
  age: yup.number().positive().integer().required(),
}).required();

export default function Test() {
  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p style={{ color: "red"}}>{errors.firstName?.message}</p>
        
      <input {...register("age")} />
      <p>{errors.age?.message}</p>
      
      <input type="submit" />
    </form>
  );
}
