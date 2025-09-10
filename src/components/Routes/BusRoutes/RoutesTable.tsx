import React from "react";
import RouteRow from "./RouteRow";
import { routesTableStyles } from "./routesTable.styles";

interface RoutesTableProps {
  routes: any[];
  buses: any[];
  drivers: any[];
  selectedBusForRoute: { [routeId: string]: string };
  selectedDriverForRoute: { [routeId: string]: string };
  onBusSelect: (routeId: string, busId: string) => void;
  onDriverChange: (routeId: string, busId: string, driverId: string) => void;
  onAssign: (routeId: string) => void;
  onDelete: (routeId: string) => void;
  assignBus: (routeId: string, data: { busId: string }) => Promise<any>;
  assignDriver: (busId: string, driverId: string) => Promise<any>;
  loading?: boolean;
}

const RoutesTable: React.FC<RoutesTableProps> = ({
  routes,
  buses,
  drivers,
  selectedBusForRoute,
  selectedDriverForRoute,
  onBusSelect,
  onDriverChange,
  onAssign,
  onDelete,
  assignBus,
  assignDriver,
  loading,
}) => {
  return (
    <div className={routesTableStyles.wrapper}>
      <table className={routesTableStyles.table}>
        <thead className={routesTableStyles.thead}>
          <tr>
            <th className={routesTableStyles.th}>Route Name</th>
            <th className={routesTableStyles.th}>Stops</th>
            <th className={routesTableStyles.th}>Assigned Bus</th>
            <th className={routesTableStyles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={4} className={routesTableStyles.loadingCell}>
                Loading routes...
              </td>
            </tr>
          ) : routes?.length === 0 ? (
            <tr>
              <td colSpan={4} className={routesTableStyles.emptyCell}>
                No routes found
              </td>
            </tr>
          ) : (
            routes?.map((route) => (
              <RouteRow
                key={route._id}
                route={route}
                buses={buses}
                drivers={drivers}
                selectedBus={selectedBusForRoute[route._id] || ""}
                selectedDriver={selectedDriverForRoute[route._id] || ""}
                onBusSelect={(busId) => onBusSelect(route._id, busId)}
                onDriverChange={(driverId) =>
                  onDriverChange(
                    route._id,
                    selectedBusForRoute[route._id],
                    driverId
                  )
                }
                onAssign={() => onAssign(route._id)}
                onDelete={() => onDelete(route._id)}
                assignBus={assignBus}
                assignDriver={assignDriver}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTable;
