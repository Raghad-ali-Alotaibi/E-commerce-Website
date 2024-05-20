import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home, ProductDetails, Register, Login, Error, DashboardAdmin, DashboardUser} from "@/pages/Pages"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/slug/:productSlug" element={<ProductDetails />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          <Route path="/dashboard/user" element={<DashboardUser />} />
          <Route path="/dashboard/user/profile" element={<DashboardUser />} />
          <Route path="/dashboard/user/orders" element={<DashboardUser />} />

          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/categories" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/products" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/users" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/orders" element={<DashboardAdmin />} />


          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
