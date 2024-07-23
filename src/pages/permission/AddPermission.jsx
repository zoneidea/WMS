import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getMenu, addPermission, setViewStatus } from '../../features/permission/permissionSlice.js'
import { constants } from '../../constants/constants.js';

import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import { Button, Box } from '@mui/material';
import { FormLabel, Input } from '@mui/joy';
import DataTable from 'react-data-table-component';

export default function AddPermission() {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const [roleName, setRoleName] = useState('')
  const [menus, setMenus] = useState([]);
  const [orgId, setOrgId] = useState(1)

  useEffect(() => {
    const getData = async () => {
      try {
        axios.get(constants.GET_MENU_API)
          .then(response => {
            setMenus(response.data);
          })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData()
  }, [])




  const onRoleNameChanged = (e) => setRoleName(e.target.value)
  const canSave = roleName && addRequestStatus === 'idle'
  const onSavePermissionClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(
          addPermission({ roleName, menus, orgId })
        )
        unwrapResult(resultAction)
        setRoleName('')
        console.log(`SuccessFully to save permission`);
      } catch (error) {
        console.error(`Failed to save permission`, error);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  //ตาราง table 
  const handleViewStatus = (rowMenuId) => {
    const updatedStatus = menus.map(menu =>
      menu.menuId === rowMenuId ? { ...menu, viewStatus: !menu.viewStatus } : menu
    )
    console.log(`updatedStatus`, updatedStatus);
    setMenus(updatedStatus)
  }

  const handleInsertStatus = (rowMenuId) => {
    const updatedStatus = menus.map(menu =>
      menu.menuId === rowMenuId ? { ...menu, insertStatus: !menu.insertStatus } : menu
    )
    console.log(`updatedStatus`, updatedStatus);
    setMenus(updatedStatus)
  }

  const handleEditStatus = (rowMenuId) => {
    const updatedStatus = menus.map(menu =>
      menu.menuId === rowMenuId ? { ...menu, editStatus: !menu.editStatus } : menu
    )
    console.log(`updatedStatus`, updatedStatus);
    setMenus(updatedStatus)
  };

  const handleDelStatus = (rowMenuId) => {
    const updatedStatus = menus.map(menu =>
      menu.menuId === rowMenuId ? { ...menu, delStatus: !menu.delStatus } : menu
    )
    console.log(`updatedStatus`, updatedStatus);
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
          <Box>
            <input
              type='checkbox'
              name='viewStatus'
              checked={row.viewStatus}
              onChange={() => handleViewStatus(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'เพิ่ม',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              name='insertStatus'
              checked={row.insertStatus}
              onChange={() => handleInsertStatus(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'แก้ไข',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              name='editStatus'
              checked={row.editStatus}
              onChange={() => handleEditStatus(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'ลบ',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              name='delStatus'
              checked={row.delStatus}
              onChange={() => handleDelStatus(row.menuId)}
            />
          </Box>
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
      <h1 className="page-header">เพิ่มสิทธิ์ผู้ใช้งาน <small>Add Permission</small></h1>
      <Panel>
        <PanelHeader>เพิ่มสิทธิ์ผู้ใช้งาน</PanelHeader>
        <PanelBody>

          {/* <div>
            <h1>Users</h1>
            {menus.loading && <p>Loading...</p>}
            {menus.error && <p>Error: {menus.error}</p>}
            <ul>
              {menus.menus.map((menu) => (
                <li key={menu.menuId}>{menu.menuName}</li>
              ))}
            </ul>
          </div> */}

          <form>
            <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
              <FormLabel
                sx={{
                  width: "20%",
                  textAlign: "right",
                  display: "inline-block",
                  fontSize: 12
                }}>
                ชื่อสิทธิ์ผู้ใช้งาน
                <span style={{ color: "red" }}> *</span></FormLabel>
              <Input
                sx={{
                  backgroundColor: "#fff",
                  width: "70%",
                  marginLeft: 1,
                  fontSize: 12
                }}
                size='sm'
                placeholder='Enter Rolename'
                type='text'
                value={roleName}
                onChange={onRoleNameChanged}
              />
            </Box>

            <hr />

            {/* Table */}
            <DataTable
              columns={columns}
              data={menus}
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
              <Link to="/settings/perm">
                <Button
                  variant="outlined"
                  sx={{ width: 100 }}
                >
                  ยกเลิก
                </Button>
              </Link>
              <Button
                variant="contained"
                sx={{ width: 100 }}
                type="submit"
                onClick={onSavePermissionClicked}
                disabled={!canSave}
              >
                บันทึก
              </Button>
            </Box>
          </form>

        </PanelBody>
      </Panel>
    </div >
  )
}



// import { React, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// import { useDispatch, useSelector } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
// import { getMenu, addPermission, setViewStatus } from '../../features/permission/permissionSlice.js'
// import { constants } from '../../constants/constants.js';

// import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
// import { Button, Box } from '@mui/material';
// import { FormLabel, Input } from '@mui/joy';
// import DataTable from 'react-data-table-component';

// export default function AddPermission() {
//   const dispatch = useDispatch()

//   const [menus, setMenus] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         axios.get(constants.GET_MENU_API)
//           .then(response => {
//             setMenus(response.data);
//           })
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     getData()
//   }, [])

//   const [roleName, setRoleName] = useState('')

//   const [addRequestStatus, setAddRequestStatus] = useState('idle')

//   const [loading, setLoading] = useState(false);

//   const onRoleNameChanged = (e) => setRoleName(e.target.value)
//   const canSave = roleName && addRequestStatus === 'idle'
//   const onSavePermissionClicked = async () => {
//     if (canSave) {
//       try {
//         setAddRequestStatus('pending')
//         const resultAction = await dispatch(
//           addPermission(roleName, menus)
//         )
//         unwrapResult(resultAction)
//         setRoleName('')
//         console.log(`SuccessFully to save permission`);
//       } catch (error) {
//         console.error(`Failed to save permission`, error);
//       } finally {
//         setAddRequestStatus('idle')
//       }
//     }
//   }

//   //สร้าง Role + Permission เก็บลง db
//   // const handleSubmit = (e) => {
//   //   e.preventDefault()
//   //   axios.post(constants.POST_ROLE_API, { roleName, menus, orgId: 1 })
//   //     .then(response => {
//   //       console.log('Role save on DB successfully', response);
//   //     }).catch(error => {
//   //       console.error("There was an error saving the Role!", error);
//   //     })
//   // }

//   //ตัวแปร menu เก็บ menu จาก api + แสดง table
//   // const [menus, setMenus] = useState([]);
//   // console.log('menus', menus);

//   //insert roleName ลง db

//   //handle ชื่อ Role
//   // const handleChangeRoleName = (e) => {
//   //   setRoleName(e.target.value)
//   // }

//   //ตาราง table inside Modal
//   const handleViewStatus = (rowMenuId) => {
//     const updatedStatus = menus.map(menu =>
//       menu.menuId === rowMenuId ? { ...menu, viewStatus: !menu.viewStatus } : menu
//     )
//     console.log(`updatedStatus`, updatedStatus);
//     setMenus(updatedStatus)
//   }

//   // const handlePermissionInsert = (rowMenuId) => {
//   //   const updatedStatus = menus.map(menu =>
//   //     menu.menuId === rowMenuId ? { ...menu, insertStatus: !menu.insertStatus } : menu
//   //   )
//   //   menus(updatedStatus)
//   // }

//   // const handlePermissionEdit = (rowMenuId) => {
//   //   const updatedStatus = menus.map(menu =>
//   //     menu.menuId === rowMenuId ? { ...menu, editStatus: !menu.editStatus } : menu
//   //   )
//   //   menus(updatedStatus)
//   // };

//   // const handlePermissionDel = (rowMenuId) => {
//   //   const updatedStatus = menus.map(menu =>
//   //     menu.menuId === rowMenuId ? { ...menu, delStatus: !menu.delStatus } : menu
//   //   )
//   //   menus(updatedStatus)
//   // };

//   const columns =
//     [
//       {
//         name: 'รหัสเมนู',
//         selector: row => row.menuId, // คอลัมน์จาก API
//         sortable: true,
//       }, {
//         name: 'เมนู',
//         selector: row => row.menuName, // คอลัมน์จาก API
//         sortable: true,
//         cell: row => <div>{row.menuName}</div>, // ปรับแต่งการแสดงผลของเซลล์
//       }, {
//         name: 'ดู',
//         cell: row => (
//           <Box>
//             <input
//               type='checkbox'
//               name='viewStatus'
//               checked={row.viewStatus}
//               onChange={() => handleViewStatus(row.menuId)}
//             />
//           </Box>
//         ),
//       }, {
//         name: 'เพิ่ม',
//         cell: row => (
//           <Box>
//             <input
//               type='checkbox'
//               name='insertStatus'
//               checked={row.insertStatus}
//             // onChange={() => handlePermissionInsert(row.menuId)}
//             />
//           </Box>
//         ),
//       }, {
//         name: 'แก้ไข',
//         cell: row => (
//           <Box>
//             <input
//               type='checkbox'
//               name='editStatus'
//               checked={row.editStatus}
//             // onChange={() => handlePermissionEdit(row.menuId)}
//             />
//           </Box>
//         ),
//       }, {
//         name: 'ลบ',
//         cell: row => (
//           <Box>
//             <input
//               type='checkbox'
//               name='delStatus'
//               checked={row.delStatus}
//             // onChange={() => handlePermissionDel(row.menuId)}
//             />
//           </Box>
//         ),
//       },
//     ]

//   return (
//     <div>
//       <ol className="breadcrumb float-xl-end">
//         <li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
//         <li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
//         <li className="breadcrumb-item active">Blank Page</li>
//       </ol>
//       <h1 className="page-header">เพิ่มสิทธิ์ผู้ใช้งาน <small>Add Permission</small></h1>
//       <Panel>
//         <PanelHeader>เพิ่มสิทธิ์ผู้ใช้งาน</PanelHeader>
//         <PanelBody>

//           {/* <div>
//             <h1>Users</h1>
//             {menus.loading && <p>Loading...</p>}
//             {menus.error && <p>Error: {menus.error}</p>}
//             <ul>
//               {menus.menus.map((menu) => (
//                 <li key={menu.menuId}>{menu.menuName}</li>
//               ))}
//             </ul>
//           </div> */}

//           <form>
//             <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
//               <FormLabel
//                 sx={{
//                   width: "20%",
//                   textAlign: "right",
//                   display: "inline-block",
//                   fontSize: 12
//                 }}>
//                 ชื่อสิทธิ์ผู้ใช้งาน
//                 <span style={{ color: "red" }}> *</span></FormLabel>
//               <Input
//                 sx={{
//                   backgroundColor: "#fff",
//                   width: "70%",
//                   marginLeft: 1,
//                   fontSize: 12
//                 }}
//                 size='sm'
//                 placeholder='Enter Rolename'
//                 type='text'
//                 value={roleName}
//                 onChange={onRoleNameChanged}
//               />
//             </Box>

//             <hr />

//             {/* Table */}
//             <DataTable
//               columns={columns}
//               data={menus}
//               progressPending={loading}
//               pagination
//             />
//             {/* Table */}

//             <Box style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 10,
//               marginTop: 10,
//             }}>
//               <Link to="/settings/perm">
//                 <Button
//                   variant="outlined"
//                   sx={{ width: 100 }}
//                 >
//                   ยกเลิก
//                 </Button>
//               </Link>
//               <Button
//                 variant="contained"
//                 sx={{ width: 100 }}
//                 type="submit"
//                 onClick={onSavePermissionClicked}
//                 disabled={!canSave}
//               >
//                 บันทึก
//               </Button>
//             </Box>
//           </form>

//         </PanelBody>
//       </Panel>
//     </div >
//   )
// }