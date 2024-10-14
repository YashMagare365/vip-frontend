
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Navbar from './components/shared/Navbar';
import Contact from './pages/Contact';
import Footer from './components/shared/Footer';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyAccount from './pages/MyAccount';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { updateUser } from './redux/slices/UsrSlice';
import axios from 'axios';
import { updateLogin } from './redux/slices/LoginSlice';
import Mens from './pages/Mens';
import Women from './pages/Women';
import MyOrders from './pages/MyOrders';
import SearchPage from './pages/SearchPage';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
        headers: { token }
      })
        .then(res => {
          // const user = {
          //   name: res.data.user.name,
          //   email: res.data.user.email,
          //   phone: res.data.user.phoneno,
          //   id: res.data.user.id,
          // }
          const user = res.data.user;
          dispatch(updateUser(user));
          dispatch(updateLogin(true))
        });
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/my-orders" element={<MyOrders />} />
                  <Route path="/checkout/:type" element={<Checkout />} />
                  <Route path="/account" element={<MyAccount />} />
                  <Route path="/about-us" element={<Mens />} />
                  <Route path="/contact" element={<Women />} />
                  <Route path="/packages" element={<Women />} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};