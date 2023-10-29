import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../Redux/actions";
import CardContainer from "../../Components/CardContainer/CardContainer";
import Pagination from "../../Components/Pagination/Pagination"
const Home = () => {
  const dispatch = useDispatch();

  const itemsPerPage= 9; // cantidad de drivers que se va monstrar por pagina 


  // traigo alldrivers de mi reducer con los drivers
  const allDrivers = useSelector((state) => state.allDrivers);
console.log(allDrivers);
  // searchDriver para la búsqueda en la search bar
  const searchDriver = useSelector((state) => state.searchDriver);

  // ordenamiento de ascendente y descendete por nombre de redux(reducer)
  const orderDriversByName = useSelector((state) => state.orderDriversByName);

  // ordenamiento de ascendente y descendete por nacimiento de redux(reducer)
  const orderDriversByDate = useSelector((state) => state.orderDriversByDate);

  const driversFiltered = useSelector((state) => state.driversFiltered);
  //const selectedTeam = useSelector((state) => state.selectedTeam);  // !linea de prueba, no hace nada por el momento

  //monto el componente cada vez que se actualiza la pagina
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  //console.log("allDrivers:", allDrivers); // Agrega este console.log para verificar allDrivers
  //console.log("driversFiltered:", driversFiltered); // Agrega este console.log para verificar driversFiltered

  return (
    <div className="home">
      <CardContainer
        allDrivers={
          searchDriver && searchDriver.length > 0
            ? searchDriver
            : orderDriversByName && orderDriversByName.length > 0
            ? orderDriversByName
            : orderDriversByDate && orderDriversByDate.length > 0
            ? orderDriversByDate
            : driversFiltered && driversFiltered.length > 0
            ? driversFiltered
            : allDrivers
        }
        
      />

      <Pagination allDrivers={allDrivers} itemsPerPage={itemsPerPage}/>
    </div>
  );
};

export default Home;
