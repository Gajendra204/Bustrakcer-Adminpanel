export interface TableStyles {
  wrapper: string;
  table: string;
  thead: string;
  th: string;
  td: string;
  row: string;
  actionCell: string;
  actionButtonContainer: string;
  editButton: string;
  deleteButton: string;
  loadingCell: string;
  emptyCell: string;
}

export const tableStyles: TableStyles = {
  wrapper: "bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-white/50",
  table: "w-full",
  thead: "bg-gradient-to-r from-gray-900 to-gray-900",
  th: "px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-widest",
  td: "px-6 py-6 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100/50",
  row: "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all ",
  actionCell: "px-6 py-4 whitespace-nowrap text-sm font-medium",
  actionButtonContainer: "flex space-x-3",
  editButton: "text-gray-600 hover:text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 p-3 rounded-xl",
  deleteButton: "text-red-600 hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 hover:scale-110 transition-all duration-300 p-3 rounded-xl",
  loadingCell: "text-center py-16 text-gray-500 text-xl font-semibold animate-pulse",
  emptyCell: "text-center py-16 text-gray-500 text-xl font-semibold"
};