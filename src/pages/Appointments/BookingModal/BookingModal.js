import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import { Button, circularProgressClasses } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';

const BookingModal = ({ open, handleClose, currentService, selectedDate, refetch }) => {
    const [user] = useAuthState(auth)
    const { email, displayName } = user;
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

    const { _id, name, slots, price } = currentService;
    const [slot, setSlot] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');
    const date = format(selectedDate, 'PP')

    const handleSubmit = (event) => {
        event.preventDefault();
        const bookingInfo = {
            treatmentId: _id,
            treatment: name,
            price,
            date,
            slot,
            patient: email,
            patientName: displayName,
            phone,
            address
        }
        fetch('https://beautify-me-server.up.railway.app/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId) {
                    toast.success(`${name} appointment booked by ${user?.displayName} on ${date} at ${slot}`)
                    refetch()
                    handleClose()
                } else {
                    toast.error(`You have already booked ${name} on ${date}`)
                }
            })
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form onSubmit={handleSubmit}>
                            <TextField className='my-3' id="service-name" label="Service Name" variant="filled" value={name} readonly />
                            <TextField className='my-3' id="service-price" label="Service Price" variant="filled" value={price} readonly />
                            <TextField className='my-3' id="date" label="Date" variant="filled" value={date} readonly />
                            <TextField className='my-3' id="name" label="Your Name" variant="filled" />
                            <TextField className='my-3' id="address" label="Address" variant="filled" onBlur={(e) => setAddress(e.target.value)} />
                            <TextField className='my-3' id="phone" label="Phone Number" variant="filled" onBlur={(e) => setPhone(e.target.value)} />
                            <FormControl fullWidth className='my-3' >
                                <InputLabel id="slots">Slot</InputLabel>
                                <Select
                                    labelId="slot"
                                    id="slot"
                                    value={slot}
                                    label="selectedSlot"
                                    onChange={(e) => setSlot(e.target.value)}
                                >
                                    {slots?.map(slot => <MenuItem value={slot}>{slot}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Button variant="contained" type='submit'>Confirm Booking</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default BookingModal;