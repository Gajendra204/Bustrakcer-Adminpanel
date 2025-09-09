export interface StudentsByRouteStyles {
  container: string;
  header: string;
  title: string;
  errorMessage: string;
}

export const studentsByRouteStyles: StudentsByRouteStyles = {
  container: "p-4",
  header: "flex justify-between items-center mb-6",
  title: "text-2xl font-bold",
  errorMessage: "text-red-500",
};