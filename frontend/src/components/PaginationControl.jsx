import React from 'react';

const PaginationControls = ({ page, totalPages, onPageChange }) => {
  return (
    <div>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>Previous</button>
      <span>{page} / {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>Next</button>
    </div>
  );
};

export default PaginationControls;
