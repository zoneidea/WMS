import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from '../../components/panel/panel.jsx';
import axios from 'axios';
import { constants } from '../../constants/constants.js';

import { FormLabel, Input, Select } from '@mui/joy';
import { Button, Box, MenuItem } from '@mui/material';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    usersFName: yup.string().required(),
    usersLName: yup.string().required(),
}).required();

export default function AddUsers() {

    //Validation
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = data => console.log(data);
    console.log(`register`, register);

    //เรียก role จาก api เก็บลงตัวแปร role
    useEffect(() => {
        const getData = async () => {
            try {
                axios.get(constants.GET_ROLE_API)
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
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     axios.post('http://zoneidea.dyndns-ip.com:5000/User/AddUser', formUser)
    //         .then(response => {
    //             console.log('User save on DB successfully', response);
    //         }).catch(error => {
    //             console.error("There was an error saving the User!", error);
    //         })
    //     console.log('formUser', formUser);
    // }

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
    console.log('formUser', formUser);

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

    const styles = theme => ({
        multilineColor: {
            color: 'red'
        }
    });

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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                ชื่อ
                                <span style={{ color: "red" }}> *</span></FormLabel>
                            <Input
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "70%",
                                    marginLeft: 1,
                                    fontSize: 12
                                }}
                                size='sm'
                                placeholder='Enter Firstname'
                                type='text'
                                name='usersFName'
                                // value={formUser.usersFName}
                                // onChange={handleChangeformUsers}
                                {...register("usersFName")}
                            />
                        </Box>
                        <FormLabel sx={{ marginLeft: "21%", fontSize: 12 }}>{errors.usersFName?.message}</FormLabel>

                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                นามสกุล
                                <span style={{ color: "red" }}> *</span></FormLabel>
                            <Input
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "70%",
                                    marginLeft: 1,
                                    fontSize: 12
                                }}
                                size='sm'
                                placeholder='Enter Lastname'
                                type='text'
                                name='usersLName'
                                value={formUser.usersLName}
                                onChange={handleChangeformUsers}
                                {...register("usersLName")}
                            />
                        </Box>
                        <FormLabel sx={{ marginLeft: "21%", fontSize: 12 }}>{errors.usersLName?.message}</FormLabel>

                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                สิทธิ์ผู้ใช้งาน
                                <span style={{ color: "red" }}> *</span>
                            </FormLabel>
                            <select
                                class="form-control form-control-sm selectpicker ddlStatus btn-update dropdown-toggle mx-2"
                                style={{ width: "70%", borderRadius: 5 }}
                                onChange={handleSelectedRole}
                            >
                                {getRoles.map((getRole) => (
                                    <option
                                        key={getRole.roleId}
                                        value={getRole.roleId}
                                    >{getRole.roleName}</option>
                                ))}
                            </select>
                        </Box>

                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                ชื่อผู้ใช้
                                <span style={{ color: "red" }}> *</span></FormLabel>
                            <Input
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "70%",
                                    marginLeft: 1,
                                    fontSize: 12
                                }}
                                size='sm'
                                placeholder='Enter Username'
                                type='text'
                                name='usersUsername'
                                value={formUser.usersUsername}
                                onChange={handleChangeformUsers}
                            />
                        </Box>

                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                อีเมล์
                                <span style={{ color: "red" }}>&nbsp;&nbsp;</span></FormLabel>
                            <Input
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "70%",
                                    marginLeft: 1,
                                    fontSize: 12
                                }}
                                size='sm'
                                placeholder='Enter Email'
                                type='email'
                                name='usersEmail'
                                value={formUser.usersEmail}
                                onChange={handleChangeformUsers}
                            />
                        </Box>

                        <Box style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
                            <FormLabel
                                sx={{
                                    width: "20%",
                                    textAlign: "right",
                                    display: "inline-block",
                                    fontSize: 12
                                }}>
                                รหัสผ่าน
                                <span style={{ color: "red" }}> *</span></FormLabel>
                            <Input
                                sx={{
                                    backgroundColor: "#fff",
                                    width: "70%",
                                    marginLeft: 1,
                                    fontSize: 12
                                }}
                                size='sm'
                                placeholder='Enter Password'
                                type='password'
                                name='usersPassword'
                                value={formUser.usersPassword}
                                onChange={handleChangeformUsers}
                            />
                        </Box>

                        <Box style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 10,
                            marginTop: 40,
                        }}>
                            <Link to='/settings/users'>
                                <Button variant="outlined" type='submit' sx={{ width: 100, fontSize: 12 }}>
                                    ยกเลิก
                                </Button>
                            </Link>
                            <Button variant="contained" type='submit' sx={{ width: 100, fontSize: 12 }}>บันทึก</Button>
                        </Box>
                    </form>

                </PanelBody>
            </Panel>
        </div >
    )
}