import React from "react";

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="page">
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
      </ul>
    </nav>
  );
};

export default Pagination;
