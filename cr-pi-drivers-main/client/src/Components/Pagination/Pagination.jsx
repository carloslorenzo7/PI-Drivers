
import PropTypes from "prop-types";
//import { useState } from "react";



const Pagination = ({ currentPage, itemsPerPage, totalDrivers, onPageChange }) => {
  const totalPages = Math.ceil(totalDrivers / itemsPerPage);
  const pagesToShow = 10; // Cantidad de páginas a mostrar en un rango

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);

  return (
    <div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
          (page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      <p> Page {currentPage} of {totalPages}</p>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  totalDrivers: PropTypes.number,
  onPageChange: PropTypes.func,
};




export default Pagination;
