import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./Components/dashboard";
import "./App.css";
import LoginForm from "./Components/login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
