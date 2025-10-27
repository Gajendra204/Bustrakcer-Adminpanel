export interface RouteManageModalStyles {
  overlay: string;
  container: string;
  title: string;
  fieldContainer: string;
  label: string;
  select: string;
}

export const routeManageModalStyles: RouteManageModalStyles = {
  overlay: "fixed inset-0 flex items-center justify-center z-[100]",
  container: "bg-white rounded-lg p-6 w-full max-w-md",
  title: "text-xl font-bold mb-4",
  fieldContainer: "mb-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  select: "w-full p-2 border rounded-md",
};