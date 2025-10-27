export interface ModalStyles {
  overlay: string;
  container: string;
  title: string;
  form: string;
  fieldContainer: string;
  label: string;
  input: string;
  select: string;
}

export const modalStyles: ModalStyles = {
  overlay: "fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-sm",
  container: "bg-white rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all duration-300 ease-in-out",
  title: "text-xl font-bold mb-4",
  form: "space-y-4",
  fieldContainer: "mb-4",
  label: "block text-sm font-medium text-gray-700 mb-1",
  input: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 hover:border-gray-400",
  select: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 hover:border-gray-400 cursor-pointer"
};