import { useState } from "react";
import { Plus } from "lucide-react";
import { MapLocationPicker } from "../../MapLocationPicker/MapLocationPicker";
import { routeFormStyles } from "./routeForm.styles";

interface RouteFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

const RouteForm = ({ onCancel, onSubmit }: RouteFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    stops: [{ name: "", location: { lat: 0, lng: 0 }, order: 0 }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStopChange = (index: number, field: string, value: string) => {
    const updatedStops = [...formData.stops];
    if (field === "lat" || field === "lng") {
      updatedStops[index].location = {
        ...updatedStops[index].location,
        [field]: parseFloat(value),
      };
    } else {
      updatedStops[index] = {
        ...updatedStops[index],
        [field]: field === "order" ? parseInt(value) : value,
      };
    }
    setFormData({ ...formData, stops: updatedStops });
  };

  const addStop = () => {
    setFormData({
      ...formData,
      stops: [
        ...formData.stops,
        {
          name: "",
          location: { lat: 0, lng: 0 },
          order: formData.stops.length,
        },
      ],
    });
  };

  const removeStop = (index: number) => {
    const updatedStops = formData.stops.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      stops: updatedStops.map((stop, i) => ({ ...stop, order: i })),
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      name: "",
      stops: [{ name: "", location: { lat: 0, lng: 0 }, order: 0 }],
    });
  };

  return (
    <div
      className={routeFormStyles.overlay}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className={routeFormStyles.container}>
        <h2 className={routeFormStyles.title}>Add New Route</h2>
        <form onSubmit={handleFormSubmit} className={routeFormStyles.form}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter route name"
            className={routeFormStyles.input}
            required
          />

          {formData.stops.map((stop, index) => (
            <div key={index} className={routeFormStyles.stopContainer}>
              <div className={routeFormStyles.stopHeader}>
                <h3 className={routeFormStyles.stopTitle}>Stop {index + 1}</h3>
                {formData.stops.length > 1 && (
                  <button
                    type="button"
                    className={routeFormStyles.removeButton}
                    onClick={() => removeStop(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                type="text"
                placeholder="Stop Name"
                value={stop.name}
                onChange={(e) =>
                  handleStopChange(index, "name", e.target.value)
                }
                className={routeFormStyles.input}
                required
              />
              <MapLocationPicker
                onLocationSelect={(lat, lng) => {
                  handleStopChange(index, "lat", lat.toString());
                  handleStopChange(index, "lng", lng.toString());
                }}
                initialPosition={[
                  stop.location.lat || 28.5339,
                  stop.location.lng || 77.2111,
                ]}
              />
              <input
                type="number"
                value={stop.order}
                onChange={(e) =>
                  handleStopChange(index, "order", e.target.value)
                }
                className={routeFormStyles.inputNumber}
                required
                min={0}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addStop}
            className={routeFormStyles.addStopButton}
          >
            <Plus className={routeFormStyles.addStopIcon} /> Add Stop
          </button>

          <div className={routeFormStyles.actionContainer}>
            <button type="submit" className={routeFormStyles.submitButton}>
              Add Route
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={routeFormStyles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteForm;
