import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Bus, Users, MapPin, Menu, X } from "lucide-react";
import { sidebarStyles } from "./sidebar.styles";

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, path: "/home" },
    { id: "drivers", label: "Drivers", icon: Users, path: "/drivers" },
    { id: "buses", label: "Buses", icon: Bus, path: "/buses" },
    { id: "routes", label: "Routes", icon: MapPin, path: "/routes" },
  ];

  return (
    <>
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={sidebarStyles.mobileToggleButton}
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <div
        className={`${sidebarStyles.sidebar} ${
          isMobileOpen ? sidebarStyles.sidebarOpen : sidebarStyles.sidebarClosed
        }`}
      >
        <div className={sidebarStyles.container}>
          <nav className={sidebarStyles.nav}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `${sidebarStyles.navLink} ${
                      isActive ? sidebarStyles.navLinkActive : ""
                    }`
                  }
                  onClick={() => setIsMobileOpen(false)}
                  end={item.path === "/home"}
                >
                  <Icon className={sidebarStyles.icon} />
                  <span className={sidebarStyles.label}>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {isMobileOpen && (
        <div
          className={sidebarStyles.overlay}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
