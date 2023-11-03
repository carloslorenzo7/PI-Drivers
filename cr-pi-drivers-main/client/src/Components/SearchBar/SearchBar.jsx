import { useDispatch } from "react-redux";
import { searchByName } from "../../Redux/actions";
import { useState } from "react";
import style from "./SearchBar.module.css"

const SearchBar = () => {
  const dispatch = useDispatch();

  // searchDriver para la busqueda en la search bar
  //const searchDriver = useSelector((state) => state.searchDriver);
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
    setError("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validSearch = /^[A-Za-z\s]*$/.test(searchString);

    if (searchString.trim() === "") {
      setError("Please enter a valid search");
    } else if (!validSearch){
      setError("Please enter only letters")
    }else {
      dispatch(searchByName(searchString));
      setError("");
    }
  };

  return (
    <div className={style.searchBar}>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="Search..."
          value={searchString}
          onChange={handleChange}
        />
        <button type="submit" >Search</button>
      </form>
      {error && <div className={style.error}>{error}</div>}
    </div>
  );
};

export default SearchBar;
