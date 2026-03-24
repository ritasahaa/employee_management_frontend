// Employee Details Page
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {getEmployeeById, deleteEmployee, updateEmployeeStatus} from "../services/employeeService.js";
// import HelpDrawer from '../components/HelpDrawer.jsx';
// import { helpContent } from '../components/helpContent.js';

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    // TODO: Fetch employee details by ID
    // TODO: Call getEmployeeById API
    // TODO: Handle loading state
    // TODO: Handle 404 if employee not found
    // TODO: Set employee data
    // TODO: Handle errors
    
    // Temporary mock data for UI testing
    // setTimeout(() => {
    //   setEmployee({
    //     id: '1',
    //     name: 'John Anderson',
    //     email: 'john.anderson@company.com',
    //     phone: '+1-555-0101',
    //     department: 'Engineering',
    //     role: 'Senior Software Engineer',
    //     joiningDate: '2020-01-15',
    //     salary: 95000,
    //     status: 'active',
    //     address: '123 Main St, San Francisco, CA 94102'
    //   });
    //   setLoading(false);
    // }, 500);

   const fetchEmployee = async () => {
     try{
      setLoading(true);
      const res = await getEmployeeById(id);
      const data = res.data ;

      setEmployee(data);
     } catch(err) {
       setError(err || "Failed to fetch employee");
     } finally {
       setLoading(false);
     }
   };

   fetchEmployee();
  }, [id]);

  // TODO: Implement handleDelete function
  // TODO: Show confirmation dialog
  // TODO: Call deleteEmployee API
  // TODO: Navigate to employee list on success
  // TODO: Handle errors
  const handleDelete = async() => {
    if (!window.confirm(`Are you sure you want to delete ${employee.name}?`)) return;

    try {
      await deleteEmployee(employee._id || employee._id);
      alert("Employee deleted successfully");
      navigate("/employees");

    }catch(err) {
      alert(err || "Delete failed");
    }
  };

  // TODO: Implement handleStatusToggle function
  // TODO: Call updateEmployeeStatus API
  // TODO: Update employee state with new status
  // TODO: Handle errors
  const handleStatusToggle = async() => {
    try {
      const newStatus = employee.status === "active" ? "inactive" : "active";
      const res = await updateEmployeeStatus(employee._id || employee._id, newStatus);

      setEmployee(prev => ({
        ...prev,
        status: newStatus
      }))
      alert(`Status updated to ${newStatus}`);
    }catch (err) {
      alert(err || "Status update failed");
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading employee details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.error}>
        <p>{error}</p>
        <button onClick={() => navigate('/employees')} style={styles.backButton}>
          Back to List
        </button>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={styles.error}>
        <p>Employee not found</p>
        <button onClick={() => navigate('/employees')} style={styles.backButton}>
          Back to List
        </button>
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
        <h1 style={styles.title}>Employee Details</h1>
        <button onClick={() => navigate('/employees')} style={styles.backButton}>
          ← Back to List
        </button>
      </div>

      <div style={styles.detailsContainer}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <div style={styles.avatar}>
            {employee.name.charAt(0).toUpperCase()}
          </div>
          <div style={styles.headerInfo}>
            <h2 style={styles.employeeName}>{employee.name}</h2>
            <p style={styles.employeeRole}>{employee.role}</p>
            <span 
              style={{
                ...styles.statusBadge,
                ...(employee.status === 'active' 
                  ? styles.statusActive 
                  : styles.statusInactive
                )
              }}
            >
              {employee.status}
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div style={styles.detailsGrid}>
          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Employee ID</span>
            <span style={styles.detailValue}>{employee._id}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Email</span>
            <span style={styles.detailValue}>{employee.email}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Phone</span>
            <span style={styles.detailValue}>{employee.phone}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Department</span>
            <span style={styles.detailValue}>{employee.department}</span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Joining Date</span>
            <span style={styles.detailValue}>
              {new Date(employee.joiningDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div style={styles.detailItem}>
            <span style={styles.detailLabel}>Salary</span>
            <span style={styles.detailValue}>
              ${employee.salary.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Address Section */}
        {employee.address && (
          <div style={styles.addressSection}>
            <span style={styles.detailLabel}>Address</span>
            <p style={styles.addressValue}>{employee.address}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.actions}>
          <button
            onClick={() => navigate(`/employees/edit/${employee._id}`)}
            style={styles.editButton}
          >
            ✏️ Edit Employee
          </button>
          
          <button
            onClick={handleStatusToggle}
            style={styles.statusButton}
          >
            🔄 Toggle Status
          </button>
          
          <button
            onClick={handleDelete}
            style={styles.deleteButton}
          >
            🗑️ Delete Employee
          </button>
        </div>
      </div>

      {/* Help Drawer */}
      {/* <HelpDrawer 
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.employeeDetails}
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
  error: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  headerSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '40px',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '40px',
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
  },
  employeeName: {
    margin: '0 0 8px 0',
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
  },
  employeeRole: {
    margin: '0 0 12px 0',
    fontSize: '16px',
    color: '#64748b',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusActive: {
    backgroundColor: '#d1fae5',
    color: '#059669',
  },
  statusInactive: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '24px',
    padding: '40px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  detailLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
  },
  addressSection: {
    padding: '0 40px 40px 40px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '24px',
  },
  addressValue: {
    margin: '12px 0 0 0',
    fontSize: '16px',
    color: '#1e293b',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    gap: '15px',
    padding: '30px 40px',
    borderTop: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  editButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  statusButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#f59e0b',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default EmployeeDetails;

