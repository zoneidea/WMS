import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@mui/material';

export default function Users() {
  const dispatch = useDispatch()

  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const user = useSelector(state => state.user.users)
  console.log(`user`, user);

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

          <Link to="addusers">
            <Button variant="contained" type='submit' sx={{ fontSize: 12 }}>เพิ่มผู้ใช้งาน</Button>
          </Link>

          <hr />

          {/* Outside Modal */}
          {/* Outside Modal */}

        </PanelBody>
      </Panel>
    </div >
  )
}