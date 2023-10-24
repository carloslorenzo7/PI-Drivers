import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/actions";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();

  // searchDriver para la busqueda en la search bar
  //const searchDriver = useSelector((state) => state.searchDriver);
  const [searchString, setSearchString] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
    console.log("handleChange:",handleChange);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByName(searchString));
    console.log("onSbumit:",onSubmit);
  };

  return (
    <div>
    <form onSubmit={onSubmit} >
      <input
        type="search"
        placeholder="Search..."
        value={searchString}
        onChange={handleChange}
      />
       <button type="submit">Search</button>
    </form>

    </div>
  );
};

export default SearchBar;
