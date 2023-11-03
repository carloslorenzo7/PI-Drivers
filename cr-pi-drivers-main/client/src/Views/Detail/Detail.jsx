import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css";

const Detail = () => {
  const details = useSelector((state) => state.details);
  console.log("Estado details:", details);

  const dispatch = useDispatch();
  const { id } = useParams(); // Obtiene el 'id' de la URL

  useEffect(() => {
    dispatch(getDetails(id)); // Pasa el 'id' a la acción getDetails
  }, [dispatch, id]);

  return (
    <div className={style.detail}>
      <div className={style.background}></div>
    <div className={style.img}>
      <img  src={details.image? details.image.url:"../../../../server/src/images/cocheF1.jpg"} alt="Driver" />
    </div>
    <div className={style.detailColumn}>
      <h2>
        {details.name?`${details.name.forename} ${details.name.surname}`: "Nombre no disponible "}
      </h2>
      <h4>Dob: {details.dob}</h4>
      <h4>Nationality: {details.nationality}</h4>
      <h4>Teams: {details.teams}</h4>
      <h4>Descrption: {details.description}</h4>
    </div>
  </div>
);
};

export default Detail;
