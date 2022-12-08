
import Signup from "./Component/Signup";
import Login from './Component/Login';
import { Route, Routes } from "react-router-dom";
import Manager from './Manager/Manager';
import './App.css';
import EmpData from "./Employee/EmpData";
function App() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/empdata/:uid" element={<EmpData/>}/>
        <Route path="/manager" element={<Manager/>}/>

      </Routes>
   </div>
  );
}

export default App;
