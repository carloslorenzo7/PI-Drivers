/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import style from "../Card/Card.module.css";

const Card = ({ id, name, teams, image }) =>{
  
  const imageUrl = image?.url || image; // Si hay un .url, úsalo; de lo contrario, usa la cadena directamente
  

   // Para el campo 'teams'
   //const cardTeams = Array.isArray(teams) ? teams.map(team => team.name || team).join(', ') : teams;
  

  return(
    
    <div key={id} className={style.Card}>
           {/* {user.image && user.image.url ? <img src={user.image.url} /> : null} */}
            <img src={imageUrl} alt={`Driver ${name?.forename} ${name?.surname}`} /> 
            <h3> Name: {name.forename} {name.surname} </h3>
           <div className={style.TeamContainer}>
             <h4>Team: {teams}</h4>
           </div>
           <NavLink to={`/detail/${id}`}>
             <button>Detail</button>
           </NavLink>
        </div>

  )
}


export default Card;
