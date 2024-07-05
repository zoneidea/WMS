import { React, useState, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';

function Users() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    const blue = {
        200: '#99CCFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0066CC',
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

    const TriggerButton = styled('button')(
        ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 600;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: #fff;
      border: 1px solid ${grey[200]};
      color: ${grey[900]};
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
      &:hover {
        background: ${grey[50]};
        border-color: ${grey[300]};
      }
  
      &:active {
        background: ${grey[100]};
      }
  
      &:focus-visible {
        box-shadow: 0 0 0 4px ${blue[200]};
        outline: none;
      }
    `,
    );

    const labelDiv = styled('button')(
        ({ theme }) => css`
        display: grid,
        grid-template-columns: max-content max-content,
        grid-gap: 5px,
    `,
    );

    const labelStyle = styled('button')(
        ({ theme }) => css`
        text-align: right
    `,
    );

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
                    {/* Modal */}
                    <div>
                        <TriggerButton type="button" onClick={handleOpen}
                            style={{
                                fontSize: 12,
                                color: "black",
                            }}>
                            เพิ่มผู้ใช้งาน
                        </TriggerButton>
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
                                <p id="unstyled-modal-description" className="modal-description">
                                    <Box style={{ marginBottom: 20 }}>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>ชื่อจริง<span style={{ color: "red" }}> *</span></label>
                                        <input style={{ width: "70%", marginLeft: 10 }} placeholder='Enter Firstname' />
                                    </Box>
                                    <Box style={{ marginBottom: 20 }}>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>นามสกุล<span style={{ color: "red" }}> *</span></label>
                                        <input style={{ width: "70%", marginLeft: 10 }} placeholder='Enter Lastname' />
                                    </Box>
                                    <Box style={{ marginBottom: 20 }}>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>ระดับ<span style={{ color: "red" }}> *</span></label>
                                        <select style={{ width: "70%", height: 30, marginLeft: 10 }}>
                                            <option value="">เลือกระดับผู้ใช้งาน</option>
                                        </select>
                                    </Box>
                                    <Box style={{ marginBottom: 20 }}>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>ชื่อผู้ใช้<span style={{ color: "red" }}> *</span></label>
                                        <input style={{ width: "70%", marginLeft: 10 }} placeholder='Enter Username' />
                                    </Box>
                                    <Box style={{ marginBottom: 20 }}>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>อีเมล์<span style={{ color: "red" }}>&nbsp;&nbsp;</span></label>
                                        <input style={{ width: "70%", marginLeft: 10 }} placeholder='Enter Email' />
                                    </Box>
                                    <Box>
                                        <label style={{
                                            width: "20%",
                                            textAlign: "right",
                                            display: "inline-block"
                                        }}>รหัสผ่าน<span style={{ color: "red" }}> *</span></label>
                                        <input style={{ width: "70%", marginLeft: 10 }} placeholder='Enter Password' />
                                    </Box>
                                </p>
                                <hr />
                                <Box style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 10,
                                    marginTop: 10,
                                }}>
                                    <Button variant="outlined" style={{ width: 100 }}>ยกเลิก</Button>
                                    <Button variant="contained" style={{ width: 100 }}>บันทึก</Button>
                                </Box>
                            </ModalContent>
                        </Modal>
                    </div>
                    {/* Modal */}
                    <hr />
                </PanelBody>
            </Panel>
        </div>
    )
}

export default Users;