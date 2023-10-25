import { Link } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import {
  sortDriversByName,
  sortDriversByDate,
  filterByTeam,
} from "../../Redux/actions";
import style from "./NavBar.module.css";

//import { useDispatch } from "react-redux";
//import { searchByName } from "../../Redux/actions";
const NavBar = () => {
  const dispatch = useDispatch();
  // use state para manejar el estado del filtrado por team
  const [selectTeam, setSelectTeam] = useState("All");

  // manejador de evento de ordenamiento por nombre
  const handleNameSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByName(sortOrder));
  };

  // manejador de evento de ordenamiento por nacimiento
  const handleDateSortChange = (event) => {
    console.log("Manejador de eventos handleTeamSortChange llamado"); // Agrega este console.log
    const sortOrder = event.target.value;
    dispatch(sortDriversByDate(sortOrder));
  };

  // manejador de evento de ordenamiento por team
  const handleTeamSortChange = (event) => {
    const selectedTeam = event.target.value;
    setSelectTeam(selectedTeam);
    dispatch(filterByTeam(selectedTeam));
  };
  return (
    <div className={style.container}>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      <SearchBar />
      {/* ---------------------------------------------------------------------------------------- */}
      <label htmlFor="sortSelect">Order Drivers By Name</label>
      <select id="sortSelect" onChange={handleNameSortChange} value="Order">
        <option value="Order" disabled>
          {" "}
          Order
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
      {/* ------------------------------------------------------------------------------- */}

      <label htmlFor="sortSelect">Order Drivers By Date</label>
      <select id="sortSelect" onChange={handleDateSortChange} value="Order">
        <option value="Order" disabled>
          Order
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
      {/* -------------------------------------------------------------------------------- */}


      <label htmlFor="teamSelect">Select Team</label>
      <select
        id="teamSelect"
        onChange={handleTeamSortChange}
        value={selectTeam}
      >
        <option value="All">All</option>
        <option value="McLaren">McLaren</option>
        <option value="Mercedes">Mercedes</option>
        <option value="Williams">Williams</option>
        <option value="Ferrari">Ferrari</option>
        <option value="Alfa Romeo">Alfa Romeo</option>
        <option value="Honda">Honda</option>
        <option value="Maserati">Maserati</option>
        <option value="Aston Martin">Aston Martin</option>
        <option value="Alpine">Alpine</option>
      </select>
    </div>
  );
};

export default NavBar;
