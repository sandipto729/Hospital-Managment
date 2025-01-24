import React from 'react'
import Navbar from './layouts/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Doctors from './pages/Doctors/Doctors'
import Login from './pages/Authentication/Login'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Appointment from './pages/Appointment/Appointment'
import MyAppointments from './pages/Profile/MyAppointments'
import MyProfile from './pages/Profile/MyProfile'
import Footer from './layouts/Footer/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
// import AdminPortal from './../../admin/src/main'
import GoogleMap from './GoogleMap/FindNearestHospital'
import JitsiMeet from './VideoChat/Jitsi'
import Headroom from 'react-headroom'

const App = () => {
  return (
    <div style={{marginLeft: '40px', marginRight: '40px'}}>
      <ToastContainer />
      <Headroom>  <Navbar /></Headroom>
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
  
        <Route path='/nearest-hospitals' element={<GoogleMap />} />
        <Route path='/meet' element={<JitsiMeet />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App