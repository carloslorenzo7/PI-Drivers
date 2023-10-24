import axios from "axios";
export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DETAILS = "GET_DETAILS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SORT_DRIVERS_BY_NAME= "SORT_DRIVERS_BY_NAME"
export const SORT_DRIVERS_BY_DATE="SORT_DRIVERS_BY_DATE"

export const getDrivers = () => {
  return async function (dispatch) {
    try {
      const dataDrivers = await axios("http://localhost:3001/drivers");
      return dispatch({
        type: "GET_DRIVERS",
        payload: dataDrivers.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getDetails = (id) => {
  return async function (dispatch) {
    try {
      const detailData = await axios(`http://localhost:3001/drivers/${id}`);
      console.log("Detalles de la API:", detailData);
      return dispatch({
        type: "GET_DETAILS",
        payload: detailData.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const searchByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios(
        `http://localhost:3001/drivers/name?name=${name}`
      );
      console.log("Detalles de la API:", response.data);
      return dispatch({
        type: "SEARCH_BY_NAME",
        payload: response.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};


export const sortDriversByName= (order)=>{
return{ type:"SORT_DRIVERS_BY_NAME", payload: order}
  
}

export const sortDriversByDate= (order)=>{
  return{ type:"SORT_DRIVERS_BY_DATE", payload: order}
    
  }

