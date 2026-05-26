import { useMemo } from "react";
import Icon from "../../atoms/Icon";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
}

function range(start: number, end: number): number[] {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
}: PaginationProps) {
    const pages = useMemo(() => {
        if (totalPages <= 3) return range(1, totalPages);

        const left = Math.max(currentPage - siblingCount, 2);
        const right = Math.min(currentPage + siblingCount, totalPages - 1);
        const showLeftEllipsis = left > 2;
        const showRightEllipsis = right < totalPages - 1;

        const items: (number | "...")[] = [1];

        if (showLeftEllipsis) items.push("...");

        items.push(...range(left, right));

        if (showRightEllipsis) items.push("...");

        items.push(totalPages);

        return items;
    }, [currentPage, totalPages, siblingCount]);

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination mb-0">
                <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }} aria-label="Anterior">
                        <Icon name="chevron-left" />
                    </a>
                </li>
                {pages.map((page, index) =>
                    page === "..." ? (
                        <li key={`ellipsis-${index}`} className="page-item disabled">
                            <span className="page-link">...</span>
                        </li>
                    ) : (
                        <li key={page} className={`page-item${currentPage === page ? " active" : ""}`}>
                            <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); onPageChange(page); }}>
                                {page}
                            </a>
                        </li>
                    ),
                )}
                <li className={`page-item${currentPage === totalPages ? " disabled" : ""}`}>
                    <a className="page-link" href="#" onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }} aria-label="Siguiente">
                        <Icon name="chevron-right" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Pagination;
