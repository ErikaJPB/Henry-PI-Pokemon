import React from "react";

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, currentPage }) => {
  // constant with total number of pages
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    // 60 aprox / 12
    pageNumbers.push(i);
  }

  function handlePrevBtn() {
    paginate(currentPage > 1 ? currentPage - 1 : 1);
  }

  function handleNextBtn() {
    paginate(
      currentPage < pageNumbers.length
        ? currentPage + 1
        : pageNumbers.length
    );
  }

  return (
    <nav>
      <ul className="page">
        {/* to render the pagination.. if array has something that it should.. we are going to map and for each number it should have a button with the paginate number */}
        <button className="btn" onClick={() => handlePrevBtn()}>
          Prev
        </button>

        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              key={number}
              className="btn"
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}

        <button className="btn" onClick={(event) => handleNextBtn(event)}>
          Next
        </button>
      </ul>
    </nav>
  );
};

export default Pagination;
