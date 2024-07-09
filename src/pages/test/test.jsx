import { React, useState, useEffect, forwardRef, useRef, useMemo, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

function EditModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [values, setValues] = useState({
    name: "",
    surname: ""
  })

  const handleChangeValues = (e) => {
    const { name, value } = e.target
    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {/* Item */}
          <div>
            <input
              name='name'
              type="email"
              value={values.name}
              onChange={handleChangeValues}
              placeholder="Enter your Email"
            />
          </div>
          {/* Item */}
          {/* Item */}
          <div>
            <input
              name='surname'
              type="email"
              value={values.surname}
              onChange={handleChangeValues}
              placeholder="Enter your surname"
            />
          </div>
          {/* Item */}
        </div>
      </Modal>
    </>
  )
}

export default EditModal
