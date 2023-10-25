/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";
const Card = ({ user }) => {
  return (
    <div className={style.Card}>
      <img src={user.image.url} />
      <h3> Name: {user.name.surname} {user.name.forename} </h3>
      <div className={style.TeamContainer}>
        <h3>Team: {user.teams}</h3>
      </div>
      <NavLink to={`/detail/${user.id}`}>
        
        <button>Detail</button>
      </NavLink>
    </div>
  );
};

export default Card;
