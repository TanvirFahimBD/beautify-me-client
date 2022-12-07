import { Button } from '@mui/material';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';

const Account = () => {
    const [user, loading] = useAuthState(auth)

    const handleAccount = (e) => {
        e.preventDefault();
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className='d-flex '>
            <div className='w-50 my-5 border-end'>
                <img className='my-5' src={user?.photoURL} alt="" width={100} height={100} style={{ borderRadius: '50%' }} />
                <form onSubmit={handleAccount}>
                    <label htmlFor="email" className='my-2'>Email</label>
                    <br />
                    <input className='w-50 p-2' type="text" value={user?.email} />
                    <br />
                    <label htmlFor="name" className='my-2'>Name</label>
                    <br />
                    <input className='w-50 p-2' type="text" value={user?.displayName} />
                    <br />
                    <label htmlFor="age" className='my-2'>Age</label>
                    <br />
                    <input className='w-50 p-2' type="text" placeholder='Enter Age' />
                    <br />
                    <label htmlFor="profession" className='my-2'>Profession</label>
                    <br />
                    <input className='w-50 p-2' type="text" placeholder='Enter Profession' />
                    <br />
                    <label htmlFor="address" className='my-2'>Address</label>
                    <br />
                    <input className='w-50 p-2' type="text" placeholder='Enter Age' />
                    <br />
                    <label htmlFor="profile-pic" className='my-3'>Profile Picture</label>
                    <br />
                    <input className='w-50 p-2 border mb-3' type="file" required />
                    <br />
                    <Button className='w-50 p-2' variant='contained'>Update Profile</Button>
                </form>
            </div>
            <div className='w-50'>
                <img src='https://i.ibb.co/R94nBGG/Resume-folder-amico.png' alt="" width={800} height={800} />
            </div>
        </div>
    );
};

export default Account;