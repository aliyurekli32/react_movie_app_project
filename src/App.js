import Navbar from "./components/Navbar"
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import MovieDetail from "./pages/MovieDetail";
import PrivateRouter from "./router/PrivateRouter";

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/" element={<Main/>}/>

      <Route path="/detail" element={<PrivateRouter/>}>
          <Route path="" element={<MovieDetail/>}/>
      </Route>
      <Route path="*" element={<Main/>}/>
     </Routes>
     
     
    </>
  );
}

export default App;
