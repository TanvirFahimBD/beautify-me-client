import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../shared/Loading/Loading';
import auth from '../../firebase.init';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut } from 'firebase/auth';
import UserTable from './UserTable';

const AllUsers = () => {
    const navigate = useNavigate()
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
    )

    const handleDelete = (email) => {
        const res = window.confirm(`Do you want to delete ${email} ?`)
        if (res) {
            fetch(`http://localhost:5000/user/${email}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
                    if (data) {
                        console.log('dt', data);
                        refetch()
                        toast.success('User deleted ')
                    }
                })
        }
    }

    const handleAdmin = (email) => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
                if (data.modifiedCount) {
                    refetch()
                    toast.success('Admin role added')
                }
            })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h3>Total {users.length} Users</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No. </TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Admin </TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((userInfo, index) => <UserTable key={index} userInfo={userInfo} index={index} handleAdmin={handleAdmin} handleDelete={handleDelete} />)}
                    </TableBody>
                </Table>
            </TableContainer>
            <ToastContainer />
        </div>
    );
};

export default AllUsers;

{/* <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                let value;
                                                if (column.id === '_id') {
                                                    value = index + 1;
                                                }
                                                else {
                                                    value = row['email'];
                                                }

                                                return (
                                                    <TableCell key={column.id} align={column.align} >
                                                        {
                                                            ((column.id === 'admin' || column.id === 'delete') && row['role'] === undefined)
                                                                ?
                                                                <Button variant='contained' onClick={() => handleAction(column.id, value)}
                                                                >{column.id}</Button>
                                                                :
                                                                value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper> */}