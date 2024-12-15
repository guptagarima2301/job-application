import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import Login from "./pages/LoginPage";
import { useState } from "react";



function App() {

  const [role, setRole] = useState(""); // Initialize role state
  return (
    <div>
      <Routes>
      <Route path="/" element={<Login setRole={setRole} />} />
      <Route path="/home" element={<HomePage role={role} />} />
      <Route path="/addemployee" element={<CreateEmployeePage />} />
      </Routes>
    </div>
  );
}

export default App;
