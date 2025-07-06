import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import MyOrders from './screens/MyOrders';
import AdminLogin from './screens/AdminLogin';
import AdminDashboard from './screens/AdminDashboard';
import Navbar from './components/Navbar';

import AddItem from './screens/admin/AddItem';
import EditIteam from './screens/admin/EditItem';
import DeleteItem from './screens/admin/DeleteItem';
import AdminUsers from './screens/admin/AdminUsers';

import { CartProvider } from './components/ContexReducer';

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/createuser', '/adminlogin'];

  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<MyOrders />} />

        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/admin/additem" element={<AddItem />} />
        <Route path="/admin/edititem" element={<EditIteam />} />
        <Route path="/admin/delete-item" element={<DeleteItem />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppWrapper />
      </Router>
    </CartProvider>
  );
}

export default App;
