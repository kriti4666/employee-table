import { useState } from "react";

const usePaginate = (totalItems, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  return {
    currentPage,
    maxPage,
    startIndex,
    endIndex,
    handlePrevPage,
    handleNextPage,
  };
};

export default usePaginate;
