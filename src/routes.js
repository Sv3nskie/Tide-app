import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";

// pages
import Token from './views/pages/Token'

// page components
import Header from './views/partials/Header';
import Footer from './views/partials/Footer';



function Rout(){
  const [slipMenu, setSlip] = useState(false);
  const [isactive, setActive] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

    return (
      <BrowserRouter>
        <Header slippageMenu={setSlip} activeState={setActive} isOpenModal={isOpenModal} setOpenModal={setOpenModal}/>
        <Routes>
          <Route path="/" exact element={<Token slippageMenu={slipMenu} setSlippage={setSlip} active={isactive} setOpenModal={setOpenModal} />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    );
}

export default Rout;