import { useMemo, type ReactNode } from "react";

export interface Column {
    key?: string;
    header: string;
    render?: (row: Record<string, unknown>) => ReactNode;
}

export interface TableProps {
    columns: Column[];
    rows: Record<string, unknown>[];
    className?: string;
}

function Table({
    columns,
    rows,
    className,
}: TableProps) {
    const thead = useMemo(() =>
        <thead className="table">
            <tr>
                {columns.map((col) => (
                    <th key={col.key ?? col.header} scope="col">{col.header}</th>
                ))}
            </tr>
        </thead>,
        [columns]);

    const tbody = useMemo(() =>
        <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {columns.map((col) => (
                        <td key={col.key ?? col.header}>
                            {col.render ? col.render(row) : String(row[col.key!] ?? '')}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>,
        [columns, rows]);

    return <table className={`table table-striped ${className ?? ''}`}>
        {thead}
        {tbody}
    </table>
}

export default Table
