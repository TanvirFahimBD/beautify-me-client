import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const DeleteConfirmModal = ({ handleClose, open, deleteBarber, handleDelete }) => {
    const { name } = deleteBarber;
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {`Do your really want to delete ${name}?`}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {`Confirm before deleting ${name}`}
                    </Typography>
                    <div>
                        <Button variant="contained" className='mt-3 mx-5' onClick={() => handleDelete(true)}>Yes</Button>
                        <Button variant="contained" className='mt-3 mx-5' onClick={() => handleDelete(false)}>No</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default DeleteConfirmModal;