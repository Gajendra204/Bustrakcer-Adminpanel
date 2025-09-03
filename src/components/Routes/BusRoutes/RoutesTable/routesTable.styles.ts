export interface RoutesTableStyles {
  wrapper: string;
  table: string;
  thead: string;
  th: string;
  td: string;
  row: string;
  actionCell: string;
  actionButtonContainer: string;
  assignButton: string;
  deleteButton: string;
  selectContainer: string;
  busSelect: string;
  driverSelect: string;
  selectOption: string;
  loadingCell: string;
  emptyCell: string;
  routeNameCell: string;
  stopsCell: string;
  assignedBusCell: string;
}

export const routesTableStyles: RoutesTableStyles = {
  wrapper: "bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm overflow-hidden border border-white/50",
  table: "w-full",
  thead: "bg-gradient-to-r from-gray-900 to-gray-900",
  th: "px-6 py-6 text-left text-xs font-bold text-white uppercase tracking-widest",
  td: "px-6 py-6 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100/50",
  row: "hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 transition-all ",
  actionCell: "px-6 py-4 whitespace-nowrap text-sm font-medium",
  actionButtonContainer: "flex space-x-3 items-center",
  assignButton: "text-green-600 hover:text-white hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/25 hover:scale-110 transition-all duration-300 p-3 rounded-xl font-medium",
  deleteButton: "text-red-600 hover:text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 hover:scale-110 transition-all duration-300 p-3 rounded-xl",
  selectContainer: "flex flex-col space-y-2",
  busSelect: "px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-blue-400",
  driverSelect: "px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-indigo-400",
  selectOption: "py-2 px-3 text-sm",
  loadingCell: "text-center py-16 text-blue-500 text-xl font-semibold animate-pulse",
  emptyCell: "text-center py-16 text-gray-500 text-xl font-semibold",
  routeNameCell: "px-6 py-6 whitespace-nowrap text-sm font-semibold text-gray-900 border-b border-gray-100/50",
  stopsCell: "px-6 py-6 text-sm text-gray-700 border-b border-gray-100/50 max-w-xs truncate",
  assignedBusCell: "px-6 py-6 whitespace-nowrap text-sm text-gray-900 border-b border-gray-100/50"
};