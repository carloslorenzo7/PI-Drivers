import { Link } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { sortDriversByName ,sortDriversByDate } from "../../Redux/actions";
import style from "./NavBar.module.css"

//import { useDispatch } from "react-redux";
//import { searchByName } from "../../Redux/actions";
const NavBar = () => {
  const dispatch = useDispatch();
// manejador de evento de ordenamiento por nombre
  const handleNameSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByName(sortOrder));
  };


  // manejador de evento de ordenamiento por nacimiento
  const handleDateSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByDate(sortOrder)); // Debes definir esta acción
  };
  return (
    <div className={style.container}>
      <Link to="/home">Home</Link>
      <Link to="/create">Form</Link>
      <SearchBar />

      <label htmlFor="sortSelect">Order Drivers By Name</label>
      <select id="sortSelect" onChange={handleNameSortChange} value="Order">
        <option value="Order" disabled> Order</option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>


      <label htmlFor="sortSelect">Order Drivers By Date</label>
      <select id="sortSelect" onChange={handleDateSortChange} value="Order">
      <option value="Order" disabled>Order</option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
    </div>
  );
};

export default NavBar;
