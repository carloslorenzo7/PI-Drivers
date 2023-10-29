/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";
const Card = ({ user }) => {
  return (
    <div key={user.id} className={style.Card}>
      {user.image && user.image.url ? <img src={user.image.url} /> : null}
      {/* <img src={user.image.url} /> */}
      {/* <h3> Name: {user.name.surname} {user.name.forename} </h3> */}
      {user.name && user.name.surname && user.name.forename && (
        <h3>Name: {user.name.surname} {user.name.forename}</h3>
      )}
      <div className={style.TeamContainer}>
        <h4>Team: {user.teams}</h4>
      </div>
      <NavLink to={`/detail/${user.id}`}>
        <button>Detail</button>
      </NavLink>
    </div>
  );
};

export default Card;
