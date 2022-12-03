import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

const RowTable = ({ rowInfo, index, handleOpen }) => {
    const { name, email, specialty, url } = rowInfo;
    return (
        <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {index + 1}
            </TableCell>
            <TableCell align="right">{name}</TableCell>
            <TableCell align="right">{email}</TableCell>
            <TableCell align="right">{specialty}</TableCell>
            <TableCell align="right">
                <img src={url} alt="" style={{ borderRadius: '50%' }} width={50} height={50} />
            </TableCell>
            <TableCell align="right">
                <Button variant='contained' onClick={() => handleOpen(rowInfo)}>Delete</Button>
            </TableCell>
        </TableRow>
    );
};

export default RowTable;