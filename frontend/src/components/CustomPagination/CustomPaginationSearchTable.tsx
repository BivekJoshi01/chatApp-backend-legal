import React, { useState, useEffect } from "react";

type Props = {
  totalPages?: number;
  currentPage: number;
  totalElements?: number;
  pageSize: number;
  onPaginationChange: (pagination: { pageNumber: number; pageSize: number }) => void;
};

export const CustomPaginationSearchTable: React.FC<Props> = ({
  totalPages = 1,
  currentPage,
  totalElements = 0,
  pageSize,
  onPaginationChange,
}) => {
  const [page, setPage] = useState(currentPage);

  // Sync local page state with currentPage prop
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePrev = () => {
    if (page > 1) onPaginationChange({ pageNumber: page - 1, pageSize });
  };

  const handleNext = () => {
    if (page < totalPages) onPaginationChange({ pageNumber: page + 1, pageSize });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPaginationChange({ pageNumber: 1, pageSize: parseInt(e.target.value, 10) });
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (page <= 3) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page >= totalPages - 2) {
      pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  const getButtonClass = (p: number | string) =>
    `flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${p === page
      ? "text-primary-90 bg-primary-50 hover:bg-primary-30 hover:text-text"
      : "text-primary-80 bg-primary-20 hover:bg-primary-20 hover:text-primary-80"
    }`;

  const options = [10, 20, 50, 100, 200];

  return (
    <div className="bg-primary-10 mt-4 p-2.5">
      <div className="flex items-center justify-between">
        <div>Total Elements: {totalElements}</div>
        <nav aria-label="Page navigation">
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${page === 1
                    ? "bg-backgroundAlt"
                    : " bg-backgroundLight hover:bg-gray-100 hover:text-gray-700"
                  } border border-e-0 border-gray-300 rounded-s-lg`}
              >
                Previous
              </button>
            </li>
            {pages.map((p, index) => (
              <li key={index}>
                {p === "..." ? (
                  <span className="flex items-center justify-center px-3 h-8 text-gray-500 bg-backgroundLight border border-gray-300">
                    ...
                  </span>
                ) : (
                  <button
                    onClick={() => onPaginationChange({ pageNumber: p as number, pageSize })}
                    className={getButtonClass(p)}
                    disabled={typeof p !== "number"}
                  >
                    {p}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${page === totalPages
                    ? "bg-backgroundAlt"
                    : " bg-backgroundLight hover:bg-gray-100 hover:text-gray-700"
                  } border border-gray-300 rounded-e-lg`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div>
          <select
            onChange={handlePageSizeChange}
            className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-0.5 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700"
          >
            <option value="" disabled>
              Rows per page
            </option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
