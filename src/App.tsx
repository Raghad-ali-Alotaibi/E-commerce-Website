import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import { Home, ProductDetails, Error } from "@/pages"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
