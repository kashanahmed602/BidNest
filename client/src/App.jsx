import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Home from "./Pages/Home";
import ClientDashboard from "./Pages/Dashboard/ClientDashboard";
import LiveAuction from "./Pages/LiveAuction";
import SellProduct from "./Pages/SellProducts";
import MyBids from "./Pages/MyBids";
import WonAuctions from "./Pages/WonAuctions";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile"

function App() {
  return (

    <Routes>

      {/* // <Route path="/" element={<Home />} /> */}

      <Route path="/login" element={<Login />} />

      {/* <Route path="/signup" element={<Signup />} /> */}

      <Route path="/dashboard" element={<ClientDashboard/>} />
      <Route path="/marketplace" element={<Home/>}/>

      <Route path='/auctions' element={<LiveAuction/>} />

      <Route path="/sell-product" element={<SellProduct/>} />

      <Route path="my-bids" element={<MyBids/>} />

      <Route path="won-auctions" element={<WonAuctions/>}/>

      <Route path="wishlist" element={<Wishlist/>}/>

      <Route path="profile" element={<Profile/>}/>


    </Routes>

  );
}

export default App;