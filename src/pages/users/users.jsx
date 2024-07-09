import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import axios from 'axios';

import { CustomButton } from '../../components/customButton/customButton.jsx';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export default function Users() {

  //เรียก role จาก api เก็บลงตัวแปร role
  useEffect(() => {
    const getData = async () => {
      try {
        axios.get('http://zoneidea.dyndns-ip.com:5000/Role/GetRole')
          .then(response => {
            setGetRoles(response.data);
          })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData()
  }, [])

  //เก็บ userForm ลง db
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://zoneidea.dyndns-ip.com:5000/User/AddUser', formUser)
      .then(response => {
        console.log('User save on DB successfully', response);
      }).catch(error => {
        console.error("There was an error saving the User!", error);
      })
    console.log('formUser', formUser);
  }

  //ตัวแปร role เก็บ role จาก api
  const [getRoles, setGetRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState('')
  // console.log('Roles', getRoles);

  //Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //ตัวแปร formUsers เก็บ formUsers ลง db
  const [formUser, setFormUser] = useState({
    usersFName: "",
    usersLName: "",
    roleId: null,
    usersUsername: "",
    usersEmail: "",
    usersPassword: ""
  })
  // console.log('formUser', formUser);

  const handleChangeformUsers = (e) => {
    const { name, value } = e.target
    setFormUser((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSelectedRole = (e) => {
    setSelectedRole(e.target.value)
    const confirmRole = selectedRole

    setFormUser((prevState) => ({
      ...prevState,
      roleId: confirmRole
    }))
  }

  return (
    <div>
      <ol className="breadcrumb float-xl-end">
        <li className="breadcrumb-item"><Link to="/page-option/blank">Home</Link></li>
        <li className="breadcrumb-item"><Link to="/page-option/blank">Page Options</Link></li>
        <li className="breadcrumb-item active">Blank Page</li>
      </ol>
      <h1 className="page-header">ผู้ใช้งาน <small>Setup Users</small></h1>
      <Panel>
        <PanelHeader>ผู้ใช้งาน</PanelHeader>
        <PanelBody>
          <CustomButton type="button" onClick={handleOpen}
            style={{
              fontSize: 12,
              color: "black",
            }}>
            เพิ่มผู้ใช้งาน
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
                  <PersonAddIcon />
                  <Typography style={{ paddingLeft: 15 }}>เพิ่มผู้ใช้งาน</Typography>
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
                      ชื่อจริง
                      <span style={{ color: "red" }}> *</span></label>
                    <input
                      style={{ width: "70%", marginLeft: 10 }}
                      placeholder='Enter Firstname'
                      type='text'
                      name='usersFName'
                      value={formUser.usersFName}
                      onChange={handleChangeformUsers}
                    />
                  </Box>
                  <Box style={{ marginBottom: 20 }}>
                    <label style={{
                      width: "20%",
                      textAlign: "right",
                      display: "inline-block"
                    }}>
                      นามสกุล
                      <span style={{ color: "red" }}> *</span></label>
                    <input
                      style={{ width: "70%", marginLeft: 10 }}
                      placeholder='Enter Lastname'
                      type='text'
                      name='usersLName'
                      value={formUser.usersLName}
                      onChange={handleChangeformUsers}
                    />
                  </Box>
                  <Box style={{ marginBottom: 20 }}>
                    <label style={{
                      width: "20%",
                      textAlign: "right",
                      display: "inline-block"
                    }}>
                      ระดับ
                      <span style={{ color: "red" }}> *</span>
                    </label>
                    <select
                      onChange={handleSelectedRole}
                      style={{
                        width: "70%",
                        height: 30,
                        marginLeft: 10
                      }}>
                      {getRoles.map((getRole) => (
                        <option key={getRole.roleId} value={getRole.roleId}>{getRole.roleName}</option>
                      ))
                      }
                    </select>
                  </Box>
                  <Box style={{ marginBottom: 20 }}>
                    <label style={{
                      width: "20%",
                      textAlign: "right",
                      display: "inline-block"
                    }}>
                      ชื่อผู้ใช้
                      <span style={{ color: "red" }}> *</span></label>
                    <input
                      style={{ width: "70%", marginLeft: 10 }}
                      placeholder='Enter Username'
                      type='text'
                      name='usersUsername'
                      value={formUser.usersUsername}
                      onChange={handleChangeformUsers}
                    />
                  </Box>
                  <Box style={{ marginBottom: 20 }}>
                    <label style={{
                      width: "20%",
                      textAlign: "right",
                      display: "inline-block"
                    }}>
                      อีเมล์
                      <span style={{ color: "red" }}>&nbsp;&nbsp;</span></label>
                    <input
                      style={{ width: "70%", marginLeft: 10 }}
                      placeholder='Enter Email'
                      type='email'
                      name='usersEmail'
                      value={formUser.usersEmail}
                      onChange={handleChangeformUsers}
                    />
                  </Box>
                  <Box>
                    <label style={{
                      width: "20%",
                      textAlign: "right",
                      display: "inline-block"
                    }}>
                      รหัสผ่าน
                      <span style={{ color: "red" }}> *</span></label>
                    <input
                      style={{ width: "70%", marginLeft: 10, marginBottom: 20 }}
                      placeholder='Enter Password'
                      type='password'
                      name='usersPassword'
                      value={formUser.usersPassword}
                      onChange={handleChangeformUsers}
                    />
                  </Box>

                </p>

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
                  >ยกเลิก</Button>
                  <Button
                    variant="contained"
                    style={{ width: 100 }}
                    type="submit"
                  >บันทึก</Button>
                </Box>
              </form>

            </div>
          </Modal>
          {/* Inside Modal */}

          <hr />

          {/* Outside Modal */}
          {/* Outside Modal */}

        </PanelBody>
      </Panel>
    </div >
  )
}