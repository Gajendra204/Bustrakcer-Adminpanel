import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { tableStyles } from "./managementTable.styles";

interface Column<T> {
  label: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface ManagementTableProps<T> {
  columns: Column<T>[];
  items: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  loading?: boolean;
  emptyText?: string;
}

function ManagementTable<T extends { _id: string }>({
  columns,
  items,
  onEdit,
  onDelete,
  loading,
  emptyText = "No items found.",
}: ManagementTableProps<T>) {
  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead className={tableStyles.thead}>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={col.className || tableStyles.th}>
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className={tableStyles.th}>Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className={tableStyles.loadingCell}
              >
                Loading...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className={tableStyles.emptyCell}
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item._id} className={tableStyles.row}>
                {columns.map((col, idx) => (
                  <td key={idx} className={tableStyles.td}>
                    {col.render(item)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className={tableStyles.actionCell}>
                    <div className="flex space-x-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(item)}
                          className={tableStyles.editButton}
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(item)}
                          className={tableStyles.deleteButton}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManagementTable;
