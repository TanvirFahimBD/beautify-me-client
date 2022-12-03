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
        <div>
            <img className='my-5' src={user?.photoURL} alt="" width={200} height={200} style={{ borderRadius: '50%' }} />
            <h3>{user?.displayName}</h3>
            <p className='my-2'>Email: {user?.email}</p>
        </div>
    );
};

export default Profile;