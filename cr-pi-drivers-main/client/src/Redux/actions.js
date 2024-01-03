import axios from "axios";
export const GET_DRIVERS = "GET_DRIVERS";
export const GET_DETAILS = "GET_DETAILS";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SORT_DRIVERS_BY_NAME = "SORT_DRIVERS_BY_NAME";
export const SORT_DRIVERS_BY_DATE = "SORT_DRIVERS_BY_DATE";
export const FILTER_ALL_TEAMS = "FILTER_ALL_TEAMS";
export const FILTER_TEAMS = "FILTER_TEAMS";
export const FILTER_API_DB = "FILTER_API_DB";


export const getDrivers = () => {
  return async function (dispatch) {
    try {
      const dataDrivers = await axios("/drivers");
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
      const detailData = await axios(`/drivers/${id}`);
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
        `/drivers/name?name=${name}`
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

export const sortDriversByName = (order) => {
  return { type: "SORT_DRIVERS_BY_NAME", payload: order };
};

export const sortDriversByDate = (order) => {
  return { type: "SORT_DRIVERS_BY_DATE", payload: order };
};

export const filterAllTeams = () => {
  return async function (dispatch) {
    try {
      const teams = await axios(`/teams`);
      //console.log("teams:", teams); //llega ok
      return dispatch({
        type: "FILTER_ALL_TEAMS",
        payload: teams.data,
      });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const filterTeams = (payload) => {
  return {
    type: "FILTER_TEAMS",
    payload,
  };
};



export const filterApiDb = (selectedOption) => {
  return async function (dispatch) {
    try {
      const dataApiDb= await axios("/drivers")
     

       

      return dispatch({
        type: "FILTER_API_DB",
        payload: {
          dataApiDb: dataApiDb.data,
          selectedOption: selectedOption,
        },
      });
    } catch (error) {
      alert(error.message);
    }
  };
};
