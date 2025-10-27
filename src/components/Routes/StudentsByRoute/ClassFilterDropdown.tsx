import { classFilterDropdownStyles } from "./classFilterDropdown.styles";

interface Props {
    selectedClass: number | "";
    onChange: (value: number | "") => void;
  }
  
  const ClassFilterDropdown = ({ selectedClass, onChange }: Props) => {
    return (
      <div className={classFilterDropdownStyles.container}>
        <label className={classFilterDropdownStyles.label}>
          Filter by Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) =>
            onChange(e.target.value ? parseInt(e.target.value) : "")
          }
          className={classFilterDropdownStyles.select}
        >
          <option value="">All Classes</option>
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Class {i + 1}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default ClassFilterDropdown;