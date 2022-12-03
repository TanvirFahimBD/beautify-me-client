import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';
import AppointmentTable from './AppointmentTable';

const MyAppointment = () => {
    const navigate = useNavigate()
    const [appointment, setAppointment] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        fetch(`http://localhost:5000/booking?patient=${user?.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    toast.error('You are not authorized to perform this action')
                    localStorage.removeItem('accessToken')
                    signOut(auth)
                    navigate('/login')
                }
                return res.json()
            })
            .then(data => {
                setAppointment(data)
            })
    }, [])

    return (
        <div>
            <h3>You have total {appointment.length} appointment</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No. </TableCell>
                            <TableCell align="right">Treatment</TableCell>
                            <TableCell align="right">Date </TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Patient Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointment.map((appointmentInfo, index) => <AppointmentTable key={index} appointmentInfo={appointmentInfo} index={index} />)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyAppointment;


