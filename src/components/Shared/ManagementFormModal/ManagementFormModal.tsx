import React from "react";
import { ModalActions } from "../ModalActions";
import { modalStyles } from "./managementFormModal.styles";

interface Field {
  label: string;
  name: string;
  type?: string;
  value?: any;
  options?: { _id: string; name: string }[];
  required?: boolean;
  placeholder?: string;
}

interface ManagementFormModalProps {
  open: boolean;
  title: string;
  fields: Field[];
  formData: Record<string, any>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  submitText: string;
  cancelText?: string;
  editingItem?: any;
}

const ManagementFormModal: React.FC<ManagementFormModalProps> = ({
  open,
  title,
  fields,
  formData,
  onChange,
  onSubmit,
  onCancel,
  submitText,
  cancelText = "Cancel",
}) => {
  if (!open) return null;

  return (
    <div
      className={modalStyles.overlay}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className={modalStyles.container}>
        <h2 className={modalStyles.title}>{title}</h2>
        <form onSubmit={onSubmit} className={modalStyles.form}>
          {fields.map((field) =>
            field.type === "select" ? (
              <div key={field.name} className={modalStyles.fieldContainer}>
                <label className={modalStyles.label}>{field.label}</label>
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={onChange}
                  className={modalStyles.select}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt._id} value={opt._id}>
                      {opt.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div key={field.name} className={modalStyles.fieldContainer}>
                <label className={modalStyles.label}>{field.label}</label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={onChange}
                  placeholder={field.placeholder}
                  className={modalStyles.input}
                  required={field.required}
                />
              </div>
            )
          )}
          <ModalActions
            submitText={submitText}
            cancelText={cancelText}
            onCancel={onCancel}
          />
        </form>
      </div>
    </div>
  );
};

export default ManagementFormModal;
