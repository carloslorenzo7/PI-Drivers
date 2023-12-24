/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  details: [],
  searchDriver: [],
  teams: [],
  driverFiltered: [],
  
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_DRIVERS":
      return {
        ...state,
        allDrivers: payload,
        allDriversCopy: payload,
      };

    case "GET_DETAILS":
      return {
        ...state,
        details: payload,
      };

    case "SEARCH_BY_NAME":
      console.log("Manejando la acción SearchByName. Payload:", payload); // Agrega este console.log
      return {
        ...state,
        searchDriver: payload,
      };

    case "SORT_DRIVERS_BY_NAME":
      const orderDriversByName = [...state.allDriversCopy];

      return {
        ...state,
        orderDriversByName:
          payload === "A"
            ? orderDriversByName.sort((a, b) =>
                a.name.surname.localeCompare(b.name.surname)
              )
            : orderDriversByName.sort((a, b) =>
                b.name.surname.localeCompare(a.name.surname)
              ),
      };

    case "SORT_DRIVERS_BY_DATE":
      const orderDriversByDate = [...state.allDriversCopy];

      return {
        ...state,
        orderDriversByDate:
          payload === "A"
            ? orderDriversByDate.sort((a, b) => a.dob.localeCompare(b.dob))
            : orderDriversByDate.sort((a, b) => b.dob.localeCompare(a.dob)),
      };

    case "FILTER_ALL_TEAMS":
      return {
        ...state,
        teams: payload,
      };

    case "FILTER_TEAMS":
      const drivers = [...state.allDriversCopy];
      // Declaro driverTeams aquí
      let driverTeams;

      driverTeams =
        payload === "All"
          ? drivers
          : drivers.filter(
              (driver) => driver.teams && driver.teams.includes(payload)
            );
      console.log("driversTeam:", driverTeams);
      return {
        ...state,
        drivers: driverTeams,
        driversFiltered: driverTeams,
      };

      case "FILTER_API_DB":
        console.log("Payload in reducer:", payload);
        const { dataApiDb, selectedOption } = payload;


    if (selectedOption === "database") {
      return {
        ...state,
        driversFiltered: dataApiDb.filter(driver => driver.source === "database"),
      };
    } else if (selectedOption === "api") {
      return {
        ...state,
        driversFiltered: dataApiDb.filter(driver => driver.source !== "database"),
      };
    } else if (selectedOption === "All") {
      console.log("Handling 'All' option");
      return {
        ...state,
        driversFiltered: dataApiDb, // opcion 2 state.allDriversCopy
      };
    }
    return state;
 
    default:
      return { ...state };
  }
};

export default reducer;
