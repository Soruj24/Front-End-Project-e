import {
  ArrowLeft,
  ArrowLeftToLine,
  ArrowRight,
  ArrowRightToLine,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  onPreviousChange: () => void;
  onNextChange: () => void;
  onFirstPage: () => void;
  onLastPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousChange,
  onNextChange,
  onFirstPage,
  onLastPage,
}: PaginationProps) => {
  const getVisiblePageNumbers = () => {
    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  return (
    <div>
      <div className="mt-4 flex justify-center text-center">
        <button
          disabled={currentPage === 1}
          onClick={onFirstPage}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <ArrowLeftToLine />
        </button>
        <button
          onClick={onPreviousChange}
          disabled={currentPage === 1}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <ArrowLeft />
        </button>
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`mx-2 px-2 py-2 rounded-md transition-colors ${
              currentPage === pageNumber
                ? "bg-blue-700 text-white font-bold"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={onNextChange}
          disabled={currentPage === totalPages}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <ArrowRight />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={onLastPage}
          className="mx-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          <ArrowRightToLine />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
