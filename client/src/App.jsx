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
import PendingRequest from "./Components/PendingRequest";
import AccountRejected from "./Components/RejectedRequest";
import ProtectedRoute from "./Components/ProtectedRoute";
import MyProducts from "./Pages/MyProducts";
import ProductDetails from "./Pages/DetailProduct";
import AuctionDetails from "./Pages/DetailAuction";
import PaymentSuccess from "./Components/payentSuccess";

function App() {
  return (

    <Routes>

      {/* // <Route path="/" element={<Home />} /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Signup/>}/>
      
      <Route path="/dashboard" element={<ProtectedRoute><ClientDashboard/></ProtectedRoute>} />

      <Route path="/marketplace" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      
      <Route path='/auctions' element={<ProtectedRoute><LiveAuction/></ProtectedRoute>} />
      
      {/* <Route path="/sell-product" element={<ProtectedRoute><SellProduct/></ProtectedRoute>} /> */}

      <Route path="my-bids" element={ <ProtectedRoute><MyBids/></ProtectedRoute>} />

      <Route path="won-auctions" element={<ProtectedRoute><WonAuctions/> </ProtectedRoute>}/>

      <Route path="wishlist" element={<ProtectedRoute><Wishlist/></ProtectedRoute>} />

      <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

      <Route path="/pending-request" element={<ProtectedRoute><PendingRequest/> </ProtectedRoute>}/>
      
      <Route path="/account-rejected" element={<ProtectedRoute><AccountRejected/></ProtectedRoute>}/>

      <Route path="/my-products" element={<ProtectedRoute><MyProducts/></ProtectedRoute>}/>

      <Route path="/product/:id" element={<ProtectedRoute><ProductDetails/></ProtectedRoute>}/>

      <Route path="/auction/:id" element={<ProtectedRoute><AuctionDetails/></ProtectedRoute>} />
      <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess/></ProtectedRoute>} />

    </Routes>

  );
}

export default App;