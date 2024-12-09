import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import GenerateTable from './components/GenerateTable';
import CreateTable from "./components/CreateTable";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-table" element={<GenerateTable />} />
        <Route path="/create-table" element={<CreateTable />} />
      </Routes>
    </Router>
  );
};

export default App;
