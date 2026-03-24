// Edit Employee Page
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEmployeeById, updateEmployee} from "../services/employeeService.js";
// import HelpDrawer from '../components/HelpDrawer.jsx';
// import { helpContent } from '../components/helpContent.js';

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    joiningDate: '',
    salary: '',
    address: '',
    status: 'active',
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});
  // const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch employee details by ID
    // TODO: Call getEmployeeById API
    // TODO: Handle loading state
    // TODO: Handle 404 if employee not found
    // TODO: Populate form with employee data
    
    // Temporary mock data for UI testing
    // setTimeout(() => {
    //   setFormData({
    //     name: 'John Anderson',
    //     email: 'john.anderson@company.com',
    //     phone: '+1-555-0101',
    //     department: 'Engineering',
    //     role: 'Senior Software Engineer',
    //     joiningDate: '2020-01-15',
    //     salary: '95000',
    //     address: '123 Main St, San Francisco, CA 94102',
    //     status: 'active',
    //   });
    //   setFetchLoading(false);
    // }, 500);
    const fetchEmployee = async () => {
      try {
        setFetchLoading(true);

        const res = await getEmployeeById(id);
        const data = res.data;
        console.log("API Response:", data);

        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          department: data.department || "",
          role: data.role || "",
          joiningDate: data.joiningDate?.slice(0,10) || "",
          salary: data.salary || "",
          address: data.address || "",
          status: data.status || "active",
        });

      }catch(error) {
        alert(error);
        navigate("/employees");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchEmployee();
  }, [id,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // TODO: Implement handleSubmit function
  // TODO: Call updateEmployee API with id and formData
  // TODO: Handle loading state during API call
  // TODO: Handle validation errors and duplicate email errors
  // TODO: On success, navigate to employee details or list
  // TODO: Display success message
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // TODO: Call updateEmployee API from employeeService
      await updateEmployee(id,formData);

      alert('Employee updated successfully');

      navigate(`/employees`);
    } catch (err) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        alert(err);
      }
    }finally{
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div style={styles.loading}>
        Loading employee data...
      </div>
    );
  }

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
        <h1 style={styles.title}>Edit Employee</h1>
        <button onClick={() => navigate('/employees')} style={styles.backButton}>
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
              {errors.name && <span style={styles.errorText}>{errors.name}</span>}
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
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
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
              {errors.phone && <span style={styles.errorText}>{errors.phone}</span>}
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
              {errors.department && <span style={styles.errorText}>{errors.department}</span>}
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
              {errors.role && <span style={styles.errorText}>{errors.role}</span>}
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
              {errors.joiningDate && <span style={styles.errorText}>{errors.joiningDate}</span>}
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
              {errors.salary && <span style={styles.errorText}>{errors.salary}</span>}
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
              {errors.status && <span style={styles.errorText}>{errors.status}</span>}
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
            {errors.address && <span style={styles.errorText}>{errors.address}</span>}
          </div>

          {/* Form Actions */}
          <div style={styles.formActions}>
            <button
              type="button"
              onClick={() => navigate(`/employees`)}
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.submitButtonDisabled : {})
              }}
            >
              {loading ? 'Updating...' : 'Update Employee'}
            </button>
          </div>
        </form>
      </div>

      {/* Help Drawer */}
      {/* <HelpDrawer 
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.editEmployee}
      /> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    position: 'relative',
  },
  helpButton: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '12px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.3s ease',
    zIndex: 900,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '700',
    color: '#1e293b',
  },
  backButton: {
    padding: '10px 20px',
    backgroundColor: '#64748b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '16px',
    color: '#64748b',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  required: {
    color: '#dc2626',
  },
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
  },
  select: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  errorText: {
    fontSize: '12px',
    color: '#dc2626',
  },
  formActions: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '10px',
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitButtonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
  },
};

export default EditEmployee;

