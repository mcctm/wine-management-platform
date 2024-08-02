import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Employees from "./components/Employees";
import WineProduction from "./components/WineProduction";
import GrapeProduction from "./components/GrapeProduction";
import Suppliers from "./components/Suppliers";
import WineBottles from "./components/WineBottles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/wineproduction" element={<WineProduction />} />
      <Route path="/winebottles" element={<WineBottles />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/grapeproduction" element={<GrapeProduction />} />
    </Routes>
  );
}

export default App;
