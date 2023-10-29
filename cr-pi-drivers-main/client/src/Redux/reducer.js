/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  details: [],
  searchDriver:[],
  teams:[],
 driverFiltered:[],
 driversApiDb: [],
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
        return{

          ...state,
          searchDriver:payload
        }

        case "SORT_DRIVERS_BY_NAME":
          
            const orderDriversByName= [...state.allDriversCopy];
            
          return{
            ...state,
            orderDriversByName: payload === "A"
            ? orderDriversByName.sort((a, b) => a.name.surname.localeCompare(b.name.surname))
            : orderDriversByName.sort((a, b) => b.name.surname.localeCompare(a.name.surname)),
          }


          case "SORT_DRIVERS_BY_DATE":
            const orderDriversByDate= [...state.allDriversCopy];
            
          return{
            ...state,
            orderDriversByDate: payload === "A"
            ? orderDriversByDate.sort((a, b) => a.dob.localeCompare(b.dob))
            : orderDriversByDate.sort((a, b) => b.dob.localeCompare(a.dob)),
          }

          case "FILTER_ALL_TEAMS":
           
          return{
            ...state,
            teams: payload
          };

          case "FILTER_TEAMS":
            const drivers= [...state.allDriversCopy]
            // Declaro driverTeams aquí
             let driverTeams;

            driverTeams= payload === "All"
            ?drivers
            :drivers.filter((driver)=>driver.teams && driver.teams.includes(payload));
            console.log("driversTeam:", driverTeams );
            return{
              ...state,
              drivers: driverTeams,
              driversFiltered:driverTeams
            }

          case "FILTER_API_DB":
            const copyApiDb= [...state.allDriversCopy];

            let driversCopyDb;

            driversCopyDb = payload ==="database"
            
            // filtro los drivers que tengan la propiedad createDb
            ? copyApiDb.filter((driver)=>driver.createDb)
              // filtro los drivers que no tengan la propiedad createDb
            :copyApiDb. filter((driver)=> !driver.createDb)
            console.log("Payload:", payload); // Agrega este console.log para verificar el valor de payload
            console.log("driversCopyDb:", driversCopyDb); // Agrega este console.log para verificar driversCopyDb
            return{
              ...state,
              drivers: payload === "All"? copyApiDb : driversCopyDb,
              driverFiltered: driversCopyDb 
            };

    default:
      return { ...state };
  }
};

export default reducer;
