import { BrowserRouter, Routes, Route } from "react-router-dom";


// pages
// import Home from './views/pages/Home';
import Token from './views/pages/Token'

// page components
import Header from './views/partials/Header';
import Footer from './views/partials/Footer';


function Rout(){
    return (
      <BrowserRouter>
        <Header/>
        <Routes>
          {/* <Route path="/" element={<Home/>} /> */}
          <Route path="/" exact element={<Token/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    );
}

export default Rout;