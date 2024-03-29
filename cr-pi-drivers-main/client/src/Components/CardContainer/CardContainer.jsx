/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import style from "../CardContainer/Card.module.css";
import { useSelector } from "react-redux";

const CardContainer = () => {
  const allDrivers = useSelector((state) => state.allDrivers);

  return (
    <div className={style.container}>
      {allDrivers.map((driver) => (
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
  );
};

export default CardContainer;
