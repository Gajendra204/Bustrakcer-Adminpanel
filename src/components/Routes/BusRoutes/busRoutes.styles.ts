export interface BusRoutesStyles {
  container: string;
  header: string;
  title: string;
  errorMessage: string;
}

export const busRoutesStyles: BusRoutesStyles = {
  container: "p-2",
  header: "flex justify-between items-center mb-6",
  title: "text-3xl font-bold text-gray-900",
  errorMessage: "text-red-500",
};