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
            <TableCell align="right">
                {email}
            </TableCell>
            <TableCell align="right">
                {
                    (role !== 'admin') && <Button variant='contained' onClick={() => handleAdmin(email)}>Admin</Button>
                }
                {
                    (role === 'admin') && <p>Already Admin</p>
                }
            </TableCell>
            <TableCell align="right">
                <Button variant='contained' onClick={() => handleDelete(email)}>Delete</Button>
            </TableCell>
        </TableRow >
    );
};

export default UserTable;