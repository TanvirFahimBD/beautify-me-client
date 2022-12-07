import { Route, Routes } from 'react-router-dom';
import './App.css';
import Account from './pages/Account/Account';
import Appointments from './pages/Appointments/Appointments';
import Blogs from './pages/Blogs/Blogs';
import ContactUs from './pages/ContactUs/ContactUs';
import AddBarBer from './pages/Dashboard/AddBarBer';
import AllUsers from './pages/Dashboard/AllUsers';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardHome from './pages/Dashboard/DashboardHome';
import ManageBarber from './pages/Dashboard/ManageBarber';
import MyAppointment from './pages/Dashboard/MyAppointment';
import MyHistory from './pages/Dashboard/MyHistory';
import MyReviews from './pages/Dashboard/MyReviews';
import Payment from './pages/Dashboard/Payment';
import Review from './pages/Dashboard/Review';
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

//TODO: live host client

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<Account />} />
          <Route path="/bookings" element={
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
            <Route path="my-appointment" element={<MyAppointment />} />
            <Route path="all-users" element={
              <RequireAdmin>
                <AllUsers />
              </RequireAdmin>
            }
            />
            <Route path="add-barber" element={
              <RequireAdmin>
                <AddBarBer />
              </RequireAdmin>
            }
            />
            <Route path="manage-barber" element={
              <RequireAdmin>
                <ManageBarber />
              </RequireAdmin>
            }
            />
            <Route path="payment/:paymentId" element={
              <Payment />
            }
            />
            <Route path="my-history" element={<MyHistory />} />
            <Route path="review/:reviewId" element={<Review />} />
            <Route path="my-reviews" element={<MyReviews />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<NoPageFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
