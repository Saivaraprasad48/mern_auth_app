import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

function App() {
  const user = localStorage.getItem("user");
  const value = user ? true : false;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/*" element={value ? <Home /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
