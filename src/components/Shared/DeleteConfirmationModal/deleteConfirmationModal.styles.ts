export interface DeleteConfirmationStyles {
  overlay: string;
  container: string;
  title: string;
  message: string;
  actionContainer: string;
  cancelButton: string;
  deleteButton: string;
}

export const deleteConfirmationStyles: DeleteConfirmationStyles = {
  overlay: "fixed inset-0 flex items-center justify-center z-[100] bg-black bg-opacity-80 backdrop-blur-sm",
  container: "bg-white rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100",
  title: "text-2xl font-bold mb-6 text-red-600 flex items-center",
  message: "mb-8 text-gray-600 text-lg leading-relaxed",
  actionContainer: "flex justify-end space-x-4",
  cancelButton: "px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-semibold",
  deleteButton: "px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-200 font-semibold"
};

