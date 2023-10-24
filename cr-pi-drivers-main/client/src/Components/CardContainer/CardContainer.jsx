/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import style from "../CardContainer/Card.module.css";







const CardContainer = ({ allDrivers, searchDriver }) => {
  console.log("CardContainer:" ,allDrivers);
  return (
    <div className={style.driverContainer}>
     {searchDriver
        ? searchDriver.map((user) => <Card key={user.id} user={user} />)
        : allDrivers.map((user) => <Card key={user.id} user={user} />)}
    </div>
  );
};

export default CardContainer;
