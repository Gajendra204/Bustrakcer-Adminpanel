export interface RouteFormStyles {
  overlay: string;
  container: string;
  title: string;
  form: string;
  input: string;
  inputNumber: string;
  stopContainer: string;
  stopHeader: string;
  stopTitle: string;
  removeButton: string;
  addStopButton: string;
  addStopIcon: string;
  actionContainer: string;
  submitButton: string;
  cancelButton: string;
}

export const routeFormStyles: RouteFormStyles = {
  overlay: "fixed inset-0 flex items-center justify-center z-[100] backdrop-blur-sm",
  container: "bg-white rounded-xl p-8 w-full max-w-2xl overflow-y-auto max-h-screen shadow-2xl",
  title: "text-2xl font-bold mb-6 text-gray-900",
  form: "space-y-6",
  input: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 hover:border-gray-400",
  inputNumber: "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-all duration-200 hover:border-gray-400",
  stopContainer: "border-2 border-gray-200 p-6 rounded-xl space-y-4 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-md transition-shadow",
  stopHeader: "flex justify-between items-center",
  stopTitle: "font-bold text-lg text-gray-800",
  removeButton: "text-red-500 text-sm hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200 font-semibold",
  addStopButton: "text-sm flex items-center text-gray-700 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-semibold border border-blue-200 hover:border-blue-300",
  addStopIcon: "w-5 h-5 mr-2",
  actionContainer: "flex space-x-4 pt-6 border-t border-gray-200",
  submitButton: "flex-1 bg-gray-900 text-white py-3 px-6 rounded-xl hover:bg-gray-1000 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl",
  cancelButton: "flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-400 transition-all duration-200 font-semibold"
};