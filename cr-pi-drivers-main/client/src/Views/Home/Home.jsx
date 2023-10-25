import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../Redux/actions";

import CardContainer from "../../Components/CardContainer/CardContainer";


const Home = () => {
  const dispatch = useDispatch();
  // traigo alldrivers de mi reducer con los drivers
  const allDrivers = useSelector((state) => state.allDrivers);

  // searchDriver para la búsqueda en la search bar
  const searchDriver = useSelector((state) => state.searchDriver);

  // ordenamiento de ascendente y descendete por nombre de redux(reducer)
  const orderDriversByName = useSelector((state) => state.orderDriversByName);


  // ordenamiento de ascendente y descendete por nacimiento de redux(reducer)
  const orderDriversByDate = useSelector((state) => state.orderDriversByDate);
  
  
// filtrado por team de redux
  const teamDriver =useSelector((state)=> state.teamDriver);
  console.log("Datos de equipos en el componente:", teamDriver); // Agrega este console.log
 
  //monto el componente cada vez que se actualiza la pagina
  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);


  return (
    <div className="home">
      
     

      <CardContainer allDrivers={
  searchDriver && searchDriver.length > 0
    ? searchDriver
    : orderDriversByName && orderDriversByName.length > 0
    ? orderDriversByName
    : orderDriversByDate && orderDriversByDate.length > 0
    ? orderDriversByDate
    :teamDriver && teamDriver.length > 0
    ? teamDriver
    : allDrivers
} />
    </div>
  );
};

export default Home;
