import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';
import { constants } from '../../constants/constants.js';

import { Button, Box } from '@mui/material';
import { FormLabel, Input } from '@mui/joy';

import DataTable from 'react-data-table-component';

export default function EditPermission() {

  const { roleId, roleName } = useParams()
  // console.log('roleId', roleId);
  // console.log('roleName', roleName);

  useEffect(() => {
    try {
      axios.get(constants.GET_MENU_API)
        .then(response => {
          let getAllMenu = response.data
          // console.log(`getAllMenu`, getAllMenu)

          getAllMenu.map(async (menu, index) => {
            console.log(`menu`, menu);

            const resultPerm = await axios.get(`${constants.BASE_API}/Role/GetRolePermission?roleId=${roleId}&orgId=1&menuId=${menu.menuId}`);
            // console.log(`resultPerm`, resultPerm.data);

            menu.insertStatus = resultPerm.data[0].insertStatus
            menu.editStatus = resultPerm.data[0].editStatus
            menu.delStatus = resultPerm.data[0].delStatus
          })
          setMenus(getAllMenu)
        })
    } catch (error) {
      console.error('Error fetching Menu:', error);
    }
  }, []);


  const [dataRoleName, setDataRoleName] = useState([])
  console.log(`dataRoleName`, dataRoleName);

  //ตัวแปร menu เก็บ menu จาก api + แสดง table
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);

  //insert roleName ลง db
  // const [roleName, setRoleName] = useState('')

  //handle ชื่อ Role
  // const handleChangeRoleName = (e) => {
  //   setRoleName(e.target.value)
  // }

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

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
        <li className="breadcrumb-item active">Blank Page</li>
      </ol>
      <h1 className="page-header">แก้ไขสิทธิ์ผู้ใช้งาน <small>Edit Permission</small></h1>
      <Panel>
        <PanelHeader>แก้ไขสิทธิ์ผู้ใช้งาน</PanelHeader>
        <PanelBody>

          <form >
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
                // onChange={handleChangeRoleName}
              />
            </Box>

            <hr />

            <DataTable
              columns={columns}
              data={menus}
              progressPending={loading}
              pagination
            />

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