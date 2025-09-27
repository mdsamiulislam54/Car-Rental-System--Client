

const Pagination = ({setCurrentPage,pageArray,currentPage}) => {
    return (
        <div className="flex justify-center mt-8">
            <nav className="flex items-center gap-1 sm:gap-2">
                {/* Previous Button */}
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base dark:text-white"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    <span className="hidden sm:inline">Prev</span>
                    <span className="sm:hidden">←</span>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pageArray?.map((page) => {
                        // Show only first, last, and nearby pages on mobile
                        if (window.innerWidth < 640 &&
                            page !== 0 &&
                            page !== pageArray.length - 1 &&
                            Math.abs(page - currentPage) > 1) {
                            if (Math.abs(page - currentPage) === 2) {
                                return <span key={page} className="px-2">...</span>;
                            }
                            return null;
                        }

                        return (
                            <button
                                key={page}
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md text-sm sm:text-base ${currentPage === page
                                    ? "bg-primary text-white cursor-pointer "
                                    : "border border-gray-300 dark:text-white hover:bg-primary  hover:text-white cursor-pointer"
                                    }`}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page + 1}
                            </button>
                        );
                    })}
                </div>

                {/* Next Button */}
                <button
                    className="px-3 py-1 sm:px-4 sm:py-2 border border-gray-300 rounded-md disabled:opacity-50 text-sm sm:text-base dark:text-white"
                    disabled={pageArray?.length - 1 === currentPage}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    <span className="hidden sm:inline">Next</span>
                    <span className="sm:hidden">→</span>
                </button>
            </nav>
        </div>
    )
}

export default Pagination