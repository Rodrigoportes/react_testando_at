import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarPaises from "./componentes/SidebarPaises";
import Countries from "./pages/Countries";
import Authorities from "./pages/Authorities";
import Agendas from "./pages/Agendas";
import NotFound from "./pages/NotFound";
import "./css/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <SidebarPaises />
        <Routes>
          <Route path="/countries" element={<Countries />} />
          <Route path="/authorities" element={<Authorities />} />
          <Route path="/agendas" element={<Agendas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


