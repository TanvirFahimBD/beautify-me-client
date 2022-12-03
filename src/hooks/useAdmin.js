import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import auth from '../firebase.init';

const useAdmin = user => {
    const [admin, setAdmin] = useState(false)
    const [adminLoading, setAdminLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:5000/user/admin/${user?.email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth)
                    localStorage.removeItem('accessToken')
                }
                return res.json()
            })
            .then(data => {
                if (data) {
                    setAdmin(data?.admin)
                    setAdminLoading(false)
                }
            })
    }, [user])

    return [admin, adminLoading];
};

export default useAdmin;