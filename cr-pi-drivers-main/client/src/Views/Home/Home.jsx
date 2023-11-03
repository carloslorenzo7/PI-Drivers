import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers } from "../../Redux/actions";
import Pagination from "../../Components/Pagination/Pagination";
import Card from "../../Components/Card/Card";
import Selectors from "../../Components/Selectors/Selectors";
import style from "./Home.module.css"

const Home = () => {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state) => state.allDrivers);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // cantidad de drivers que se va a mostrar por página
  const totalDrivers = allDrivers.length;
  

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const selectedDrivers = Selectors(); // Llamo a Selectors para obtener los conductores seleccionados

  return (
    <div className={style.home}>
        <div className={style.BlurBackground}></div>
      <div className="Card">
        {selectedDrivers
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((driver) => (
            <Card
              key={driver.id}
              id={driver.id}
              name={driver.name}
              nationality={driver.nationality}
              image={driver.image}
              dob={driver.dob}
              description={driver.description}
              teams={driver.teams}
            />
          ))}
      </div>

      <div className="Pagination ">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalDrivers={totalDrivers}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </div>
  );
};


export default Home;
