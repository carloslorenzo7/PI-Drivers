import { Link } from "react-router-dom";
import Order from "../Order/Order";
import Filter from "../Filter/Filter";
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import logo from "../../assets/dlf.pt-red-streak-png-817952.png"


const NavBar = () => {
 

  return (
    <div className={style.container}>
      <nav className={style.nav}>
      <div className={style.logo}>
          <img src={logo} alt="Logo de la aplicación" />
        </div>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      </nav>

      <div className={style.controls}>
      <SearchBar />
      <Order/>
      <Filter/>

      </div>

      
    </div>
  );
};

export default NavBar;
