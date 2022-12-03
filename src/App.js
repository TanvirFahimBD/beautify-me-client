import { Route, Routes } from 'react-router-dom';
import './App.css';
import Appointments from './pages/Appointments/Appointments';
import AddBarBer from './pages/Dashboard/AddBarBer';
import AllUsers from './pages/Dashboard/AllUsers';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardHome from './pages/Dashboard/DashboardHome';
import ManageBarber from './pages/Dashboard/ManageBarber';
import MyAppointment from './pages/Dashboard/MyAppointment';
import MyHistory from './pages/Dashboard/MyHistory';
import MyReview from './pages/Dashboard/MyReview';
import Payment from './pages/Dashboard/Payment';
import Home from './pages/Home/Home/Home';
import ForgetPassword from './pages/Login/ForgetPassword/ForgetPassword';
import Login from './pages/Login/Login/Login';
import Register from './pages/Login/Register/Register';
import RequireAdmin from './pages/Login/RequireAdmin/RequireAdmin';
import RequireAuth from './pages/Login/RequireAuth/RequireAuth';
import Profile from './pages/Profile/Profie';
import Footer from './pages/shared/Footer/Footer';
import Header from './pages/shared/Header/Header';
import NoPageFound from './pages/shared/NoPageFound/NoPageFound';

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appointments" element={
            <RequireAuth>
              <Appointments />
            </RequireAuth>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } >
            <Route index element={<DashboardHome />} />
            <Route path="myappointment" element={<MyAppointment />} />
            <Route path="allusers" element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
            />
            <Route path="addbarber" element={
              <RequireAdmin>
                <AddBarBer />
              </RequireAdmin>
            }
            />
            <Route path="managebarber" element={
              <RequireAdmin>
                <ManageBarber />
              </RequireAdmin>
            }
            />
            <Route path="payment/:paymentId" element={
              <Payment />
            }
            />
            <Route path="myhistory" element={<MyHistory />} />
            <Route path="myreview" element={<MyReview />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
