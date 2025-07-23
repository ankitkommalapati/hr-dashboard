export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPrevPage,
  onPrevPage,
  onNextPage
}) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pageNumbers;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2) - 1);
    const end = Math.min(totalPages, start + maxVisiblePages);
    visiblePages = pageNumbers.slice(start, end);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className={`p-2 rounded-md ${
          hasPrevPage
            ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            1
          </button>
          {visiblePages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md ${
            currentPage === page
              ? 'bg-primary-500 text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className={`p-2 rounded-md ${
          hasNextPage
            ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            : 'text-gray-400 cursor-not-allowed'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}