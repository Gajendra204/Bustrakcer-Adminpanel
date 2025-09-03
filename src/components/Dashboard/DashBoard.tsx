import { Bus, MapPin, TrendingUp, User } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import { dashboardStyles } from "./dashboard.styles";

const Dashboard = () => {
  const { busCount, driverCount, routeCount, loading } = useDashboard();

  const stats = [
    {
      title: "Total Buses",
      value: busCount,
      icon: Bus,
      bgStyle: dashboardStyles.iconBlueBg,
    },
    {
      title: "Total Drivers",
      value: driverCount,
      icon: User,
      bgStyle: dashboardStyles.iconGreenBg,
    },
    {
      title: "Routes",
      value: routeCount,
      icon: MapPin,
      bgStyle: dashboardStyles.iconPurpleBg,
    },
    {
      title: "Students",
      value: 245,
      icon: TrendingUp,
      bgStyle: dashboardStyles.iconOrangeBg,
    },
  ];

  return (
    <div className={dashboardStyles.container}>
      <h1 className={dashboardStyles.title}>Dashboard Overview</h1>

      <div className={dashboardStyles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={dashboardStyles.statCard}>
              <div className={dashboardStyles.statCardContent}>
                <div
                  className={`${dashboardStyles.iconContainer} ${stat.bgStyle}`}
                >
                  <Icon className={dashboardStyles.icon} />
                </div>
                <div className={dashboardStyles.statTextContainer}>
                  <p className={dashboardStyles.statLabel}>{stat.title}</p>
                  <p
                    className={
                      loading
                        ? dashboardStyles.loadingValue
                        : dashboardStyles.statValue
                    }
                  >
                    {loading ? "..." : stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
