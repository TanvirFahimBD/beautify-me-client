import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../shared/Loading/Loading';

const Profile = () => {
    const [user, loading] = useAuthState(auth)
    if (loading) {
        return <Loading />
    }
    return (
        <div className='d-flex '>
            <div className='w-50'>
                <img src='https://i.ibb.co/LvcW3mp/Resume-folder-bro.png' alt="" width={800} height={800} />
            </div>
            <div className='w-50 text-start ms-5'>
                <img className='my-5' src={user?.photoURL} alt="" width={200} height={200} style={{ borderRadius: '50%' }} />
                <div className='text-left'>
                    <h1 className='my-4 text-primary' >Welcome</h1>
                    <h3>{user?.displayName}</h3>
                    <p className='my-4 font-weight-bold'><span className=''> Email: </span>{user?.email}</p>
                    <p className='my-4'><span className='font-weight-bold'> Age: </span></p>
                    <p className='my-4'><span className='font-weight-bold'> Profession:</span></p>
                    <p className='my-4'><span className='font-weight-bold'> Address: </span></p>
                </div>
            </div>
        </div>
    );
};

export default Profile;