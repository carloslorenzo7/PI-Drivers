/* eslint-disable react-hooks/rules-of-hooks */
import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({ allDrivers, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allDrivers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = allDrivers.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul>
        {currentData.map((driver, index) => (
          <li key={index}>
            <img src={driver.image.url}  />
            <p>{driver.name.forename} {driver.name.surname}</p>
            <p>{driver.team}</p>
          </li>
        ))}
      </ul>

      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Anterior
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  allDrivers: PropTypes.array, //  allDrivers
  itemsPerPage: PropTypes.number, // itemsPerPage
};

export default Pagination;
