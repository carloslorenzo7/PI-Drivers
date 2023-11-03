import {
  filterAllTeams,
  filterTeams,
  filterApiDb,
  getDrivers
} from "../../Redux/actions.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  // use state para manejar el estado del filtrado por team
  const [selectTeam, setSelectTeam] = useState("");
  const teams = useSelector((state) => state.teams);
  //console.log("teams de nav bar :", teams);

  useEffect(() => {
    dispatch(filterAllTeams());
  }, [dispatch]);

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
    <div>
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

export default Filter;
