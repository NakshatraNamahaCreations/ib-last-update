// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from "./components/Info";
import About from "./components/About";
import Interest from "./components/Interest";
import Footer from "./components/Footer";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="main">
        <section className="main__section">
          <div style={{ backgroundColor: "white", width: "24rem" }}>
            <Routes>
              <Route path="/:id" element={<Info />} />
              {/* <Route path="/about" element={<About />} />
              <Route path="/interest/:id" element={<Interest />} /> */}
            </Routes>
          </div>
        </section>
      </div>
    </Router>
  );
}
