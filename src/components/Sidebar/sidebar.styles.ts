export interface SidebarStyles {
  mobileToggleButton: string;
  sidebar: string;
  sidebarOpen: string;
  sidebarClosed: string;
  container: string;
  nav: string;
  navLink: string;
  navLinkActive: string;
  icon: string;
  iconActive: string;
  label: string;
  labelActive: string;
  overlay: string;
}

export const sidebarStyles: SidebarStyles = {
  mobileToggleButton: "lg:hidden fixed top-4 left-4 z-[100] p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-100",
  sidebar: "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-all duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200",
  sidebarOpen: "translate-x-0",
  sidebarClosed: "-translate-x-full",
  container: "flex flex-col h-full",
  nav: "pt-6 flex-1 px-3",
  navLink: "w-full flex items-center px-4 py-3 text-left rounded-xl hover:bg-gray-100 hover:shadow-sm transition-all duration-200 mb-1 group",
  navLinkActive: "bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-blue-600 shadow-sm text-blue-700",
  icon: "w-5 h-5 mr-3 text-gray-600 group-hover:text-gray-800 transition-colors",
  iconActive: "w-5 h-5 mr-3 text-blue-600",
  label: "font-medium text-gray-700 group-hover:text-gray-900 transition-colors",
  labelActive: "font-semibold text-blue-700",
  overlay: "fixed inset-0 bg-black bg-opacity-50 z-[80] lg:hidden backdrop-blur-sm"
};