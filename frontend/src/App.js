// import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./views/Login/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
