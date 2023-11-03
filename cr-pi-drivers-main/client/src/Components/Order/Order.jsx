import { sortDriversByName, sortDriversByDate } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();

  // manejador de evento de ordenamiento por nombre
  const handleNameSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByName(sortOrder));
  };

  // manejador de evento de ordenamiento por nacimiento
  const handleDateSortChange = (event) => {
    const sortOrder = event.target.value;
    dispatch(sortDriversByDate(sortOrder));
  };

  return (
    <div>
      {/* --------------order name------------------------------------------------------------------- */}
     
      <select id="sortSelect" onChange={handleNameSortChange} value="Order">
        <option value="Order" disabled>
          Order Name
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
      {/* --------------------order dob----------------------------------------------------------- */}

    
      <select id="sortSelect" onChange={handleDateSortChange} value="Order">
        <option value="Order" disabled>
          Order Dob
        </option>
        <option value="A">Ascending</option>
        <option value="D">Descending</option>
      </select>
    </div>
  );
};

export default Order;
