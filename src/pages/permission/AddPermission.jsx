import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';
import { constants } from '../../constants/constants.js';

import { Button, Box } from '@mui/material';
import { FormLabel, Input } from '@mui/joy';

import DataTable from 'react-data-table-component';

export default function AddPermission() {

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

  //สร้าง Role + Permission เก็บลง db
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(constants.POST_ROLE_API, { roleName, menus, orgId: 1 })
      .then(response => {
        console.log('Role save on DB successfully', response);
      }).catch(error => {
        console.error("There was an error saving the Role!", error);
      })
  }

  //ตัวแปร menu เก็บ menu จาก api + แสดง table
  const [menus, setMenus] = useState([]);
  console.log('menus', menus);
  const [loading, setLoading] = useState(false);

  //insert roleName ลง db
  const [roleName, setRoleName] = useState('')

  //handle ชื่อ Role
  const handleChangeRoleName = (e) => {
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
          <Box>
            <input
              type='checkbox'
              checked={row.viewStatus}
              onChange={() => handlePermissionView(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'เพิ่ม',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              checked={row.insertStatus}
              onChange={() => handlePermissionInsert(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'แก้ไข',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              checked={row.editStatus}
              onChange={() => handlePermissionEdit(row.menuId)}
            />
          </Box>
        ),
      }, {
        name: 'ลบ',
        cell: row => (
          <Box>
            <input
              type='checkbox'
              checked={row.delStatus}
              onChange={() => handlePermissionDel(row.menuId)}
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

          <form onSubmit={handleSubmit}>
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
                onChange={handleChangeRoleName}
              />
            </Box>

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