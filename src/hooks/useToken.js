import { useEffect, useState } from 'react';

const useToken = (user) => {
    const [token, setToken] = useState('')

    useEffect(() => {
        const email = user?.user?.email
        const currentUser = { email: email }
        if (email) {
            fetch(`https://beautify-me-server.up.railway.app/user/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    const accessToken = data.token;
                    if (accessToken) {
                        setToken(accessToken)
                        localStorage.setItem('accessToken', accessToken)
                    }
                })
        }
    }, [user])

    return [token]
};

export default useToken;