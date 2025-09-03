export interface TableStyles {
  wrapper: string;
  table: string;
  thead: string;
  th: string;
  td: string;
  row: string;
  actionCell: string;
  editButton: string;
  deleteButton: string;
  loadingCell: string;
  emptyCell: string;
}

export const tableStyles: TableStyles = {
  wrapper: "bg-white rounded-lg shadow-md overflow-hidden",
  table: "w-full",
  thead: "bg-gray-50",
  th: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
  td: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
  row: "hover:bg-gray-50",
  actionCell: "px-6 py-4 whitespace-nowrap text-sm font-medium",
  editButton: "text-gray-600 hover:text-gray-900 mr-3 transition-colors",
  deleteButton: "text-red-600 hover:text-red-900 transition-colors",
  loadingCell: "text-center py-4",
  emptyCell: "text-center py-4"
};
