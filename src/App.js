import NavBar from './Components/NavBar';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Contact from './Components/Contact';

import AboutUs from './Components/About'


function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
