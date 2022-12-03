import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AppointmentTable = ({ index, appointmentInfo }) => {
    const { _id, name, treatment, date, slot, address, patientName, patient, phone, price, paid, transactionId } = appointmentInfo;
    return (
        <TableRow
            key={name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {index + 1}
            </TableCell>
            <TableCell align="right">{treatment}</TableCell>
            <TableCell align="right">{date}</TableCell>
            <TableCell align="right">{slot}</TableCell>
            <TableCell align="right">{address}</TableCell>
            <TableCell align="right">{patientName}</TableCell>
            <TableCell align="right">{patient}</TableCell>
            <TableCell align="right">{phone}</TableCell>
            <TableCell align="right">
                {(price && paid) &&
                    <>
                        <p className='text-success'>Paid</p>
                        <p>TID: {transactionId}</p>
                    </>}
                {(price && !paid) &&
                    <Link to={`/dashboard/payment/${_id}`}> <Button variant='contained'> Pay ${price}</Button> </Link>}
            </TableCell >
        </TableRow >
    );
};

export default AppointmentTable;