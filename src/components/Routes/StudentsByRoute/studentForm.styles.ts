export interface StudentFormStyles {
  overlay: string;
  container: string;
  title: string;
  form: string;
  buttonContainer: string;
  submitButton: string;
  cancelButton: string;
}

export const studentFormStyles: StudentFormStyles = {
  overlay: "fixed inset-0 flex items-center justify-center z-[100] bg-opacity-70",
  container: "bg-white rounded-lg p-6 w-full max-w-md",
  title: "text-xl font-bold mb-4",
  form: "space-y-4",
  buttonContainer: "flex space-x-3 pt-4",
  submitButton: "flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg flex justify-center items-center",
  cancelButton: "flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg",
};