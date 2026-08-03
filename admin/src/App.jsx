import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";

function App() {
  return (

    <Routes>

      {/* // <Route path="/" element={<Home />} /> */}

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

    </Routes>

  );
}

export default App;