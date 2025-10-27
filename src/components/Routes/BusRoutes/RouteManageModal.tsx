import React from "react";
import { ModalActions } from "../../Shared/ModalActions";
import { routeManageModalStyles } from "./routeManageModal.styles";

interface RouteManageModalProps {
  isOpen: boolean;
  buses: any[];
  drivers: any[];
  modalBus: string;
  modalDriver: string;
  setModalBus: (busId: string) => void;
  setModalDriver: (driverId: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const RouteManageModal: React.FC<RouteManageModalProps> = ({
  isOpen,
  buses,
  drivers,
  modalBus,
  modalDriver,
  setModalBus,
  setModalDriver,
  onCancel,
  onSave,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={routeManageModalStyles.overlay}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className={routeManageModalStyles.container}>
        <h2 className={routeManageModalStyles.title}>
          Manage Route Assignment
        </h2>
        <div className={routeManageModalStyles.fieldContainer}>
          <label className={routeManageModalStyles.label}>Bus</label>
          <select
            value={modalBus}
            onChange={(e) => setModalBus(e.target.value)}
            className={routeManageModalStyles.select}
          >
            <option value="">Select Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.name} ({bus.busNumber})
              </option>
            ))}
          </select>
        </div>
        <div className={routeManageModalStyles.fieldContainer}>
          <label className={routeManageModalStyles.label}>Driver</label>
          <select
            value={modalDriver}
            onChange={(e) => setModalDriver(e.target.value)}
            className={routeManageModalStyles.select}
            disabled={!modalBus}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver._id} value={driver._id}>
                {driver.name}
              </option>
            ))}
          </select>
        </div>
        <ModalActions
          submitText="Save Assignment"
          cancelText="Cancel"
          onCancel={onCancel}
          onSubmit={onSave}
        />
      </div>
    </div>
  );
};

export default RouteManageModal;
