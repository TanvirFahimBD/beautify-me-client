import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../shared/Loading/Loading';
import useAdmin from '../../../hooks/useAdmin';
import { signOut } from 'firebase/auth';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    const [admin, adminLoading] = useAdmin(user)

    const location = useLocation()
    if (adminLoading || loading) {
        return <Loading />
    }

    if (!user || !admin) {
        signOut(auth)
        localStorage.removeItem('accessToken')
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
};

export default RequireAdmin;