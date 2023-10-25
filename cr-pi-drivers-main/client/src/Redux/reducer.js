/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
const initialState = {
  allDrivers: [],
  allDriversCopy: [],
  details: [],
  searchDriver:[],
  teamDriver:[],
 
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

          case "FILTER_BY_TEAM":
            console.log("Caso FILTER_BY_TEAM ejecutado"); // Agrega este console.log
          return{
            ...state,
            teamDriver: payload
          }





    default:
      return { ...state };
  }
};

export default reducer;
