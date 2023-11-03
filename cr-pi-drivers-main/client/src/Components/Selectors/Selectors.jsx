import { useSelector } from "react-redux"


const Selectors = () =>{
        //! estados de redux para que cumplan u funcionalidad en home     
       // all drivers, trae todos los drivers desde redux
       const allDrivers = useSelector((state) => state.allDrivers);

       // searchDriver para la búsqueda en la search bar
       const searchDriver = useSelector((state) => state.searchDriver);
    
       // ordenamiento de ascendente y descendete por nombre de redux(reducer)
       const orderDriversByName = useSelector((state) => state.orderDriversByName);
    
       // ordenamiento de ascendente y descendete por nacimiento de redux(reducer)
      const orderDriversByDate = useSelector((state) => state.orderDriversByDate);


    // filtrado de Drivers tanto para team como para api y db
       const driversFiltered = useSelector((state) => state.driversFiltered);
     
    

const selectDrivers= 
            searchDriver && searchDriver.length > 0
            ? searchDriver
            : orderDriversByName && orderDriversByName.length > 0
            ? orderDriversByName
            : orderDriversByDate && orderDriversByDate.length > 0
            ? orderDriversByDate
            : driversFiltered && driversFiltered.length > 0
            ? driversFiltered
            :allDrivers

return selectDrivers;


}


export default Selectors;