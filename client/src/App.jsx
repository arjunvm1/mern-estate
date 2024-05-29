import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import PaymentFailure from './pages/PaymentFailure';
import PaymentSuccess from './pages/PaymentSuccess';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/sign-up" element={<SignUp />}/>
      <Route path="/about" element={<About />}/>
      <Route path='/search' element={<Search/>}/>
      <Route path="/listing/:listingId" element={<Listing />}/>
      <Route path="/success" element={<PaymentSuccess/>}/>
      <Route path="/cancel" element={<PaymentFailure/>}/>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create-listing" element={<CreateListing />}/>
      <Route path="/update-listing/:listingId" element={<UpdateListing />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
