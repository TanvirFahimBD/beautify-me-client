import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMessage = () => {
    const [email, setEmail] = React.useState('')

    const handleMessage = (e) => {
        e.preventDefault()
        toast.success(`Message sent to ${email}`)
        e.target.reset()
    }

    return (
        <div>
            <h4>Contact Us</h4>
            <h2 className='text-primary mb-3'>Stay Connected With Us</h2>
            <div>
                <form onSubmit={handleMessage}>
                    <TextField id="outlined-basic" label="Email Address" variant="outlined" onBlur={(e) => setEmail(e.target.value)} />
                    <br />
                    <TextField id="outlined-basic" className='my-3' label="Subject" variant="outlined" />
                    <br />
                    <TextField
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                        defaultValue="Your Message"
                    />
                    <br />
                    <Button className='my-3' variant="contained" type='submit'>Send Message</Button>
                </form>
                <ToastContainer />
            </div>

        </div>
    );
};

export default SendMessage;