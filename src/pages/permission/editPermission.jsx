import { React, useState, useEffect } from 'react';
import axios from 'axios';

import { CustomButton } from '../../components/customButton/customButton.jsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import GroupsIcon from '@mui/icons-material/Groups';

import DataTable from 'react-data-table-component';

export default function EditPermission(props) {

    //เรียก permission จาก api เก็บลงตัวแปร getPermission
    // useEffect(() => {
    //     try {
    //         axios.get('http://zoneidea.dyndns-ip.com:5000/Menu/GetUserMenu?roleId=1&orgId=1')
    //             .then(response => {
    //                 setPermission(response.data)
    //                 console.log(response.data);
    //             })
    //     } catch (error) {
    //         console.error('Error fetching Role:', error);
    //     }
    // }, [])

    // const [permission, setPermission] = useState([])

    //หน้าต่าง modal
    const { open, handleClose, row } = props
    console.log('row edit', row);

    //ตัวแปร menu เก็บ menu จาก api + แสดง table
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(false);

    //insert roleName ลง db
    const [roleName, setRoleName] = useState('')

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

    return (
        <div>

            {/* Modal */}
            <div>
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
                                <Typography style={{ paddingLeft: 15 }}>แก้ไขสิทธิ์ผู้ใช้งาน</Typography>
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

                        <form>
                            <p id="unstyled-modal-description" className="modal-description">

                                <Box style={{ marginTop: 40, marginBottom: 20 }}>
                                    <label style={{
                                        width: "20%",
                                        textAlign: "right",
                                        display: "inline-block"
                                    }}>ชื่อสิทธิ์ผู้ใช้งาน<span style={{ color: "red" }}> *</span></label>
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

        </div >
    )
}
