import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../shared/Loading/Loading';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RowTable from './RowTable';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmModal from './DeleteConfirmModal';

const ManageBarber = () => {
    const [deleteBarber, setDeleteBarber] = useState(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = (barberInfo) => {
        setOpen(true)
        setDeleteBarber(barberInfo)
    };
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const { data: barber, isLoading, refetch } = useQuery('barbers', () => fetch('http://localhost:5000/barber', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('accessToken');
                signOut(auth)
                navigate('/login')
            }
            return res.json()
        })
    )

    const handleDelete = (dec) => {
        handleClose()
        if (dec) {
            fetch(`http://localhost:5000/barber/${deleteBarber.email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('accessToken');
                        signOut(auth)
                        navigate('/login')
                    }
                    return res.json()
                })
                .then(data => {
                    if (data.deletedCount) {
                        toast.success(`${deleteBarber.email} deleted successfully`)
                        refetch()
                    }
                })
        }
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>Total {barber.length} Barber</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No. </TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email </TableCell>
                            <TableCell align="right">Specialty</TableCell>
                            <TableCell align="right">Image</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {barber.map((rowInfo, index) => <RowTable key={index} rowInfo={rowInfo} index={index} handleOpen={handleOpen} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
            {deleteBarber && <DeleteConfirmModal open={open} handleClose={handleClose} deleteBarber={deleteBarber} handleDelete={handleDelete} />}
        </div>
    );
};

export default ManageBarber;