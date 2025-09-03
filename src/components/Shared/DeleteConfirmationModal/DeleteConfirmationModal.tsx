import { AlertTriangle } from "lucide-react"; 
import {deleteConfirmationStyles } from "./deleteConfirmationModal.styles";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }: Props) => {
  if (!isOpen) return null;

  return (
    <div className={deleteConfirmationStyles.overlay}>
      <div className={deleteConfirmationStyles.container}>
        <h2 className={deleteConfirmationStyles.title}>
          <AlertTriangle className="w-6 h-6 mr-2" />
          Confirm Deletion
        </h2>
        <p className={deleteConfirmationStyles.message}>
          Are you sure you want to delete this? This action cannot be
          undone.
        </p>
        <div className={deleteConfirmationStyles.actionContainer}>
          <button
            onClick={onCancel}
            className={deleteConfirmationStyles.cancelButton}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={deleteConfirmationStyles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
