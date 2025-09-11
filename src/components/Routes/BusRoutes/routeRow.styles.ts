export interface RouteRowStyles {
  row: string;
  cell: string;
  stopCell: string;
  stopPreview: string;
  expandedCell: string;
  expandedContent: string;
  stopList: string;
  stopListItem: string;
  actionsCell: string;
  actionsButton: string;
  dropdown: string;
  dropdownItem: string;
  dropdownIcon: string;
  dropdownSeparator: string;
}

export const routeRowStyles: RouteRowStyles = {
  row: "hover:bg-gray-50",
  cell: "px-6 py-4 font-medium text-gray-900",
  stopCell: "px-6 py-4 text-sm text-gray-500 cursor-pointer",
  stopPreview: "ml-2 text-xs text-gray-700",
  expandedCell: "bg-gray-200 px-8 py-4 border-l-4 border-gray-700",
  expandedContent: "font-semibold text-gray-700",
  stopList: "list-none ml-0 mt-2",
  stopListItem: "flex items-center mb-1 text-gray-900",
  actionsCell: "px-6 py-4 text-sm",
  actionsButton: "text-gray-600 hover:text-gray-900 px-3 py-1 rounded text-sm",
  dropdown: "absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50",
  dropdownItem: "block w-full text-left px-4 py-2 hover:bg-gray-100",
  dropdownIcon: "w-4 h-4 inline mr-2",
  dropdownSeparator: "my-1",
};