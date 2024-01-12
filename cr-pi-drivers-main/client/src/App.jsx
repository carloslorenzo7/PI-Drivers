//! Este modulo es la raiz de la aplicacion
import "./App.css";
import { useLocation } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Landing from "./Views/Landing/Landing";
import Home from "./Views/Home/Home";
import Detail from "./Views/Detail/Detail";
import Form from "./Views/Form/Form";
import axios from "axios";

//?asi estaba por defecto 
//axios.defaults.baseURL= 'http://localhost:3001/'

// el deploy de render
axios.defaults.baseURL= 'https://pi-drivers-lr27.onrender.com';


// defino las rutas para las vistas principales 
function App() {
  const location = useLocation();
     return (
    <div>
       { /*  location.pathname para omitir la nav bar en el landing y que aparerezca en el resto de las pestañas*/ }
       {location.pathname !== "/"  && <NavBar/>} 
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
