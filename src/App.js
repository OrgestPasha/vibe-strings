import React from "react";
import HomeComponent from "./Home/homeComponent";
import FooterComponent from "./Footer/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
      <FooterComponent />
    </Router>
  );
}

export default App;
