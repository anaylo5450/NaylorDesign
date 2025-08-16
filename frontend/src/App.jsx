import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/contact';
import Request from './pages/Request';
import About from './pages/about';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Policies from './pages/policies';
import AddProduct from "./pages/AddProduct.jsx";
import Product from "./pages/Product"
import axios from 'axios';

function AppContent() {
  const location = useLocation();
  const isAddProduct = location.pathname === "/admin/add";

  return (
    <div className={`flex flex-col min-h-screen text-white ${isAddProduct ? "bg-[#1c1c1c]" : "bg-black"}`}>
      <Header />
      <main className="flex-grow pt-20 px-4 bg-[#1c1c1c]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Contact" element = {<Contact />}/>
          <Route path="/Browse" element = {<Browse />}/>
          <Route path="/About" element = {<About />}/>
          <Route path="/Policies" element = {<Policies />}/>
          <Route path="/admin/add" element={<AddProduct />} />
          <Route path = "/Product/:id" element={<Product/>}/>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
