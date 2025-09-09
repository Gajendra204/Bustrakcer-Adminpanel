import { useState } from "react";
import { Loader2 } from "lucide-react";
import StudentFormFields from "./StudentFormFields";
import { useStudentForm } from "./useStudentForm";
import * as Sentry from "@sentry/react";
import { studentFormStyles } from "./studentForm.styles";

interface StudentFormProps {
  onCancel: () => void;
  onSubmit: (formData: any) => Promise<void>;
}

const StudentForm = ({ onCancel, onSubmit }: StudentFormProps) => {
  const { formData, errors, handleChange, validateForm } = useStudentForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      console.error("Submission error:", err);
       Sentry.captureException(err, {
            extra: {
            operation: "Submission error",
            context: "Submission error"
          }
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={studentFormStyles.overlay}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div className={studentFormStyles.container}>
        <h2 className={studentFormStyles.title}>Add New Student</h2>
        <form onSubmit={handleSubmit} className={studentFormStyles.form}>
          <StudentFormFields
            formData={formData}
            errors={errors}
            handleChange={handleChange}
          />
          <div className={studentFormStyles.buttonContainer}>
            <button
              type="submit"
              className={studentFormStyles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Add Student"
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className={studentFormStyles.cancelButton}
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;