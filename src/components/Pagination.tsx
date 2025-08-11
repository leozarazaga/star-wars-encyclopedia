interface PaginationProps {
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
    page: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ hasPreviousPage, hasNextPage, onNextPage, onPreviousPage, page, totalPages }) => {
    return (
        <div className="d-flex mb-5 justify-content-between align-items-center">
            <button className="pagination-btn" disabled={!hasPreviousPage} onClick={onPreviousPage} >
                Previous
            </button>

            <span className=" pagination-status">
                {page} {totalPages && " / " + totalPages}
            </span>

            <button className="pagination-btn" disabled={!hasNextPage} onClick={onNextPage}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
