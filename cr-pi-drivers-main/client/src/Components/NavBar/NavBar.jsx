import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  sortDriversByName,
  sortDriversByDate,
  filterAllTeams,
  filterTeams,
  filterApiDb,
} from "../../Redux/actions";
import style from "./NavBar.module.css";

//import { useDispatch } from "react-redux";
//import { searchByName } from "../../Redux/actions";
const NavBar = () => {
  const dispatch = useDispatch();
  // use state para manejar el estado del filtrado por team
  const [selectTeam, setSelectTeam] = useState("");
  const teams = useSelector((state) => state.teams);
  //console.log("teams de nav bar :", teams);

  useEffect(() => {
    dispatch(filterAllTeams());
  }, [dispatch]);

  // manejador de evento de ordenamiento por nombre
  const handleNameSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByName(sortOrder));
  };

  // manejador de evento de ordenamiento por nacimiento
  const handleDateSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByDate(sortOrder));
  };

  // manejador de evento de filtrado por team
  const handleFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectTeam(selectedValue);
    console.log("selectTeam:", selectedValue); // Agrega este console.log
    if (selectedValue === "All") {
      dispatch(getDrivers());
    } else {
      dispatch(filterTeams(selectedValue));
    }
  };

  // Manejador de evento de filtrado api-db
  const handleSourceFilter = (event) => {
    const selectedValue = event.target.value;
    setSelectTeam(selectedValue);
    if (selectedValue === "All") {
      dispatch(filterApiDb("All"));
    } else if (selectedValue === "api") {
      dispatch(filterApiDb("api"));
    } else if (selectedValue === "database") {
      dispatch(filterApiDb("database"));
    }
  };

  return (
    <div className={style.container}>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      <SearchBar />

      {/* --------------order name------------------------------------------------------------------- */}
      {/* <label htmlFor="sortSelect">Order Drivers By Name</label> */}
      <select id="sortSelect" onChange={handleNameSortChange} value="Order">
        <option value="Order" disabled>
          Order Name
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
      {/* --------------------order dob----------------------------------------------------------- */}

      {/* <label htmlFor="sortSelect">Order Drivers By Date</label> */}
      <select id="sortSelect" onChange={handleDateSortChange} value="Order">
        <option value="Order" disabled>
          Order Dob
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>

      {/* -----------------------filter team --------------------------------------------------------- */}

      <select onChange={(event) => handleFilter(event)} value={selectTeam}>
        <option value="All">Filter by Team...</option>

        {teams.map((team, index) => (
          <option key={index} value={team.name}>
            {team}
          </option>
        ))}
      </select>

      {/* --------------------------------filter api-db---------------------------------------------------------------------- */}

      <span>Filter by Source</span>
      <label>
        <input
          type="radio"
          value="All"
          checked={selectTeam === "All"}
          onChange={handleSourceFilter}
        />
        All
      </label>

      <label>
        <input
          type="radio"
          value="database"
          checked={selectTeam === "database"}
          onChange={handleSourceFilter}
        />
        Database
      </label>

      <label>
        <input
          type="radio"
          value="api"
          checked={selectTeam === "api"}
          onChange={handleSourceFilter}
        />
        Api
      </label>
    </div>
  );
};

export default NavBar;
