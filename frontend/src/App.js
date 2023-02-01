// import './App.css';
import { Route, Routes } from "react-router-dom";
import LoginPage from './views/Login/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />}>
        <Route path="signup" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
