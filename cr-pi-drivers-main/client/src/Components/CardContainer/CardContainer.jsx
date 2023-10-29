/* eslint-disable react/prop-types */
import Card from "../Card/Card";
import style from "../CardContainer/Card.module.css";



// const CardContainer = ({ allDrivers, searchDriver, selectedTeam }) => {
//   // Resto de tu lógica...

//   const filteredDrivers =
//     selectedTeam !== "All"
//       ? allDrivers.filter((driver) => driver.teams.includes(selectedTeam))
//       : allDrivers;

//   return (
//     <div className={style.driverContainer}>
//       {searchDriver
//         ? searchDriver.map((user) => <Card key={user.id} user={user} />)
//         : filteredDrivers.map((user) => <Card key={user.id} user={user} />)}
//     </div>
//   );
// };



const CardContainer = ({ allDrivers, searchDriver }) => {
  
  return (

    <div className={style.driverContainer}>


             {searchDriver
               ? searchDriver.map((user) => <Card key={user.id} user={user} />)
              : allDrivers.map((user) => <Card key={user.id} user={user} />)} 


    </div>
  );
};

export default CardContainer;
