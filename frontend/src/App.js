// import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./views/Login/LoginPage";
import CalendarPage from "./views/Calendar/CalendarPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}

export default App;
