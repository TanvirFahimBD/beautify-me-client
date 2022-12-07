import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const UserTable = ({ userInfo, index, handleDelete, handleAdmin }) => {
    const { _id, email, role } = userInfo;
    return (
        <TableRow
            key={_id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {index + 1}
            </TableCell>
            <TableCell align="left">
                {email}
            </TableCell>
            <TableCell align="left">
                {
                    (role !== 'admin') && <Button variant='contained' onClick={() => handleAdmin(email)}>Admin</Button>
                }
                {
                    (role === 'admin') && <p>Admin</p>
                }
            </TableCell>
            <TableCell align="left">
                <Button variant='contained' onClick={() => handleDelete(email)}>Delete</Button>
            </TableCell>
        </TableRow >
    );
};

export default UserTable;