// Add Employee Page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/employeeService";
// import HelpDrawer from "../components/HelpDrawer.jsx";
// import { helpContent } from "../components/helpContent.js";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    role: "",
    joiningDate: "",
    salary: "",
    address: "",
    status: "active",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  // const [helpOpen, setHelpOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining Date is required";
    if (!formData.status) newErrors.status = "Status is required";

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = "Salary must be positive";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if(!validate()) return;

    setLoading(true);

    try {
      // TODO: Call createEmployee API from employeeService
      await createEmployee(formData);
      alert("Employee added successfully");
      navigate('/employees');
    } catch (err) {
      if(err.response?.status === 409) {
        setApiError("Email already exists");
      }else if(err.response?.status === 400) {
        setApiError("Validation error from backend");
      }else {
        setApiError("Something went wrong");
      }
    }finally{
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Help Button */}
      {/* <button
        style={styles.helpButton}
        onClick={() => setHelpOpen(!helpOpen)}
        title="View task instructions"
      >
        📚 Task Help
      </button> */}

      <div style={styles.header}>
        <h1 style={styles.title}>Add New Employee</h1>
        <button
          onClick={() => navigate("/employees")}
          style={styles.backButton}
        >
          ← Back to List
        </button>
      </div>

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGrid}>
            {/* Name */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Name <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                style={styles.input}
              />
              {errors.name && (
                <span style={styles.errorText}>{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email <span style={styles.required}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
                style={styles.input}
              />
              {errors.email && (
                <span style={styles.errorText}>{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Phone <span style={styles.required}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                style={styles.input}
              />
              {errors.phone && (
                <span style={styles.errorText}>{errors.phone}</span>
              )}
            </div>

            {/* Department */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Department <span style={styles.required}>*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
              </select>
              {errors.department && (
                <span style={styles.errorText}>{errors.department}</span>
              )}
            </div>

            {/* Role */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Role <span style={styles.required}>*</span>
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter job role"
                required
                style={styles.input}
              />
              {errors.role && (
                <span style={styles.errorText}>{errors.role}</span>
              )}
            </div>

            {/* Joining Date */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Joining Date <span style={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
                style={styles.input}
              />
              {errors.joiningDate && (
                <span style={styles.errorText}>{errors.joiningDate}</span>
              )}
            </div>

            {/* Salary */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Salary <span style={styles.required}>*</span>
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
                required
                min="0"
                style={styles.input}
              />
              {errors.salary && (
                <span style={styles.errorText}>{errors.salary}</span>
              )}
            </div>

            {/* Status */}
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Status <span style={styles.required}>*</span>
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                style={styles.select}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <span style={styles.errorText}>{errors.status}</span>
              )}
            </div>
          </div>

          {/* Address (Full Width) */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="3"
              style={styles.textarea}
            />
            {errors.address && (
              <span style={styles.errorText}>{errors.address}</span>
            )}
          </div>

          {/* Form Actions */}
          <div style={styles.formActions}>
            <button
              type="button"
              onClick={() => navigate("/employees")}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {}),
              }}
            >
              {loading ? "Creating..." : "Create Employee"}
            </button>
          </div>
        </form>
      </div>

      {/* Help Drawer */}
      {/* <HelpDrawer
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.addEmployee}
      /> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    position: "relative",
  },
  helpButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 20px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
    transition: "all 0.3s ease",
    zIndex: 900,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#1e293b",
  },
  backButton: {
    padding: "10px 20px",
    backgroundColor: "#64748b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },
  required: {
    color: "#dc2626",
  },
  input: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
  },
  select: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#fff",
    cursor: "pointer",
  },
  textarea: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    outline: "none",
    resize: "vertical",
    fontFamily: "inherit",
  },
  errorText: {
    fontSize: "12px",
    color: "#dc2626",
  },
  formActions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  cancelButton: {
    padding: "12px 24px",
    backgroundColor: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  submitButtonDisabled: {
    backgroundColor: "#94a3b8",
    cursor: "not-allowed",
  },
};

export default AddEmployee;
