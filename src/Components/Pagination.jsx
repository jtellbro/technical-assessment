import React from "react";
/**
 * Pagination component to navigate through pages of all pokemons, and chosen favorites.
 * Previous and next buttons are disabled when the user is on the first or last page.
 * Shows current page and total pages as "Page X of Y".
 * @param {number} currentPage - Current page index (0-based).
 * @param {number} totalPages - Total number of pages.
 * @param {function} setCurrentPage - Function to change page index
 */
const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <>
      <div className=" flex flex-col items-center gap-2 mt-6 pb-4">
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
            className=" px-3 py-1 w-22 text-white bg-red-500 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
            className=" px-3 py-1 w-22 text-white bg-red-500 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <span>
          Page {currentPage + 1} of {totalPages}{" "}
        </span>
      </div>
    </>
  );
};

export default Pagination;
