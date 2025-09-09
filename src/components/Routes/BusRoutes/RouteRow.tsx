import {
  Users,
  MapPin,
  Settings,
  Edit,
  Trash,
  EllipsisVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import RouteManageModal from "./RouteManageModal";
import { routeRowStyles } from "./routeRow.styles";

interface RouteRowProps {
  route: any;
  buses: any[];
  drivers: any[];
  selectedBus: string;
  selectedDriver: string;
  onBusSelect: (busId: string) => void;
  onDriverChange: (driverId: string) => void;
  onAssign: () => void;
  onDelete: () => void;
  assignBus: (routeId: string, data: { busId: string }) => Promise<any>;
  assignDriver: (busId: string, driverId: string) => Promise<any>;
}

const RouteRow = ({
  route,
  buses,
  drivers,
  selectedBus,
  selectedDriver,
  onDelete,
  assignBus,
  assignDriver,
}: RouteRowProps) => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalBus, setModalBus] = useState(selectedBus);
  const [modalDriver, setModalDriver] = useState(selectedDriver);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleManageClick = () => {
    setModalBus(selectedBus);
    setModalDriver(selectedDriver);
    setIsManageModalOpen(true);
  };

  const handleRouteEdit = () => {
    setIsRouteModalOpen(true);
    setIsDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    onDelete();
    setIsDropdownOpen(false);
  };

  const handleManageModalSave = async () => {
    // Assign the bus to the route if changed
    if (modalBus !== selectedBus) {
      await assignBus(route._id, { busId: modalBus });
    }
    // Assign the driver to the selected bus
    if (modalBus && modalDriver) {
      await assignDriver(modalBus, modalDriver);
    }
    setIsManageModalOpen(false);
  };

  const handleManageModalCancel = () => {
    setIsManageModalOpen(false);
  };

  const currentBus = buses.find((b) => b._id === selectedBus) || route.busId;
  const currentDriver = drivers.find((d) => d._id === selectedDriver);

  return (
    <>
      <tr className={routeRowStyles.row}>
        <td className={routeRowStyles.cell}>{route.name}</td>
        <td
          className={routeRowStyles.stopCell}
          onClick={() => setExpanded((prev) => !prev)}
          title="Click to expand/collapse stops"
        >
          {(() => {
            const stops = route.stops.map((stop: any) => stop.name);
            const previewStops = stops.slice(0, 2).join(", ");
            const moreCount = stops.length - 2;
            const stopsPreview =
              moreCount > 0
                ? `${previewStops} +${moreCount} more`
                : previewStops;
            return <span>{stopsPreview}</span>;
          })()}
          <span className={routeRowStyles.stopPreview}>
            {expanded ? "▲" : "▼"}
          </span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          <div>
            <div>
              <span className="font-semibold">Bus:</span>{" "}
              {currentBus?.name
                ? `${currentBus.name} (${currentBus.busNumber})`
                : "-"}
            </div>
            <div>
              <span className="font-semibold">Driver:</span>{" "}
              {currentDriver?.name || "-"}
            </div>
          </div>
        </td>
        <td className={routeRowStyles.actionsCell}>
          <div className="relative" ref={dropdownRef}>
            <button
              className={routeRowStyles.actionsButton}
              onClick={() => setIsDropdownOpen((open) => !open)}
              aria-label="Actions"
            >
              <EllipsisVertical className="w-5 h-5" />
            </button>
            {isDropdownOpen && (
              <div className={routeRowStyles.dropdown}>
                <Link
                  className={routeRowStyles.dropdownItem}
                  to={`/routes/${route._id}/students`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Users className={routeRowStyles.dropdownIcon} />
                  View Students
                </Link>
                <button
                  className={routeRowStyles.dropdownItem}
                  onClick={() => {
                    handleManageClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Settings className={routeRowStyles.dropdownIcon} />
                  Manage Assignments
                </button>
                <button
                  className={routeRowStyles.dropdownItem}
                  onClick={() => {
                    handleRouteEdit();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Edit className={routeRowStyles.dropdownIcon} />
                  Edit Route
                </button>
                <hr className={routeRowStyles.dropdownSeparator} />
                <button
                  className={`${routeRowStyles.dropdownItem} text-red-600`}
                  onClick={() => {
                    handleDeleteClick();
                    setIsDropdownOpen(false);
                  }}
                >
                  <Trash className={routeRowStyles.dropdownIcon} />
                  Delete Route
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td
            colSpan={4}
            className={routeRowStyles.expandedCell}
          >
            <div>
              <span className={routeRowStyles.expandedContent}>All Stops:</span>
              <ul className={routeRowStyles.stopList}>
                {route.stops.map((stop: any, idx: number) => (
                  <li
                    key={idx}
                    className={routeRowStyles.stopListItem}
                  >
                    <MapPin className="w-4 h-4 mr-2 text-gray-700" />
                    <span>{stop.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
      {isManageModalOpen &&
        ReactDOM.createPortal(
          <RouteManageModal
            isOpen={isManageModalOpen}
            buses={buses}
            drivers={drivers}
            modalBus={modalBus}
            modalDriver={modalDriver}
            setModalBus={setModalBus}
            setModalDriver={setModalDriver}
            onCancel={handleManageModalCancel}
            onSave={handleManageModalSave}
          />,
          document.body
        )}
    </>
  );
};

export default RouteRow;