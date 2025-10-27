export interface DashboardStyles {
  container: string;
  title: string;
  statsGrid: string;
  statCard: string;
  statCardContent: string;
  iconContainer: string;
  iconBlueBg: string;
  iconGreenBg: string;
  iconPurpleBg: string;
  iconOrangeBg: string;
  icon: string;
  statTextContainer: string;
  statLabel: string;
  statValue: string;
  loadingValue: string;
}

export const dashboardStyles: DashboardStyles = {
  container: "p-6 bg-gray-50 min-h-screen",
  title: "text-3xl font-bold text-gray-900 mb-6",
  statsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8",
  statCard: "bg-white rounded-xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100",
  statCardContent: "flex items-center",
  iconContainer: "p-3 rounded-lg",
  iconBlueBg: "bg-blue-500",
  iconGreenBg: "bg-green-500", 
  iconPurpleBg: "bg-purple-500",
  iconOrangeBg: "bg-orange-500",
  icon: "w-6 h-6 text-white",
  statTextContainer: "ml-4",
  statLabel: "text-sm font-medium text-gray-600",
  statValue: "text-2xl font-bold text-gray-900",
  loadingValue: "text-2xl font-bold text-gray-400 animate-pulse"
};

