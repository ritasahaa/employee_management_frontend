// Employee List Page
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  { getEmployees, deleteEmployee, updateEmployeeStatus } from "../services/employeeService.js";
// import HelpDrawer from '../components/HelpDrawer.jsx';
// import { helpContent } from '../components/helpContent.js';

const EmployeeList = () => {
  const navigate = useNavigate();
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // const [helpOpen, setHelpOpen] = useState(false);
  
  // Filters and pagination
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  // TODO: Implement fetchEmployees function
  // TODO: Call getEmployees API with search, department, status, page, limit
  // TODO: Handle loading state while fetching
  // TODO: Update employees state with API response
  // TODO: Update pagination state (totalPages, currentPage)
  // TODO: Handle errors and display error message
  const fetchEmployees = async () =>{
    setLoading(true);
    setError("");
    
    try  {
      const res = await getEmployees({
        search,
        department,
        status,
        page:currentPage,
        limit,
      });
      console.log(res);
      setEmployees(res.data);
      setTotalPages(res.totalPages);
    }catch(error) {
      setError("failed to fetch employees");
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    // TODO: Call fetchEmployees when component mounts or filters change
    // Temporary mock data for UI testing

    // const mockEmployees = [
    //   {
    //     id: '1',
    //     name: 'John Anderson',
    //     email: 'john.anderson@company.com',
    //     phone: '+1-555-0101',
    //     department: 'Engineering',
    //     role: 'Senior Software Engineer',
    //     status: 'active',
    //   },
    //   {
    //     id: '2',
    //     name: 'Sarah Martinez',
    //     email: 'sarah.martinez@company.com',
    //     phone: '+1-555-0102',
    //     department: 'Marketing',
    //     role: 'Marketing Manager',
    //     status: 'active',
    //   },
    //   {
    //     id: '3',
    //     name: 'Michael Chen',
    //     email: 'michael.chen@company.com',
    //     phone: '+1-555-0103',
    //     department: 'Engineering',
    //     role: 'Frontend Developer',
    //     status: 'active',
    //   },
    // ];
   fetchEmployees();
  }, [search, department, status, currentPage]);

  // TODO: Implement handleSearch function
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // TODO: Implement handleDepartmentFilter function
  const handleDepartmentFilter = (e) => {
    setDepartment(e.target.value);
    setCurrentPage(1);
  };

  // TODO: Implement handleStatusFilter function
  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  // TODO: Implement handleDelete function
  // TODO: Show confirmation dialog
  // TODO: Call deleteEmployee API
  // TODO: Refresh employee list on success
  // TODO: Handle errors
   const handleDelete = async(id,name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await deleteEmployee(id);
      alert("Employee deleted successfully");
      // navigate("/employees");
      setEmployees(prev => prev.filter(emp => emp._id !== id));

    }catch(err) {
      alert(err || "Delete failed");
    }
  };

  // TODO: Implement handleStatusToggle function
  // TODO: Call updateEmployeeStatus API
  // TODO: Update employee in the list
  // TODO: Handle errors
   const handleStatusToggle = async(id,currentStatus) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      await updateEmployeeStatus(id, newStatus);

      setEmployees(prev => 
        prev.map(emp =>
          emp._id === id ? {...emp, status: newStatus} : emp
        )
      )
      alert(`Status updated to ${newStatus}`);
    }catch (err) {
      alert(err || "Status update failed");
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
        <h1 style={styles.title}>Employees</h1>
        <Link to="/employees/add" style={styles.addButton}>
          + Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search by name, email, role..."
          value={search}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        
        <select 
          value={department} 
          onChange={handleDepartmentFilter}
          style={styles.filterSelect}
        >
          <option value="">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Sales">Sales</option>
          <option value="Finance">Finance</option>
          <option value="Design">Design</option>
          <option value="Operations">Operations</option>
        </select>
        
        <select 
          value={status} 
          onChange={handleStatusFilter}
          style={styles.filterSelect}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.error}>{error}</div>
      )}

      {/* Loading State */}
      {loading ? (
        <div style={styles.loading}>Loading employees...</div>
      ) : (
        <>
          {/* Employee Table */}
          {!employees || employees.length === 0 ? (
            <div style={styles.empty}>
              <p>No employees found</p>
            </div>
          ) : (
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr style={styles.tableHeader}>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Role</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee._id} style={styles.tableRow}>
                      <td style={styles.td}>
                        <Link 
                          to={`/employees/${employee._id}`}
                          style={styles.nameLink}
                        >
                          {employee.name}
                        </Link>
                      </td>
                      <td style={styles.td}>{employee.email}</td>
                      <td style={styles.td}>{employee.phone}</td>
                      <td style={styles.td}>{employee.department}</td>
                      <td style={styles.td}>{employee.role}</td>
                      <td style={styles.td}>
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
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <button
                            onClick={() => navigate(`/employees/${employee._id}`)}
                            style={styles.actionBtn}
                            title="View"
                          >
                            👁️
                          </button>
                          <button
                            onClick={() => navigate(`/employees/edit/${employee._id}`)}
                            style={styles.actionBtn}
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleStatusToggle(employee._id, employee.status)}
                            style={styles.actionBtn}
                            title="Toggle Status"
                          >
                            🔄
                          </button>
                          <button
                            onClick={() => handleDelete(employee._id, employee.name)}
                            style={styles.actionBtn}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.pagination}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  ...styles.pageButton,
                  ...(currentPage === 1 ? styles.pageButtonDisabled : {})
                }}
              >
                Previous
              </button>
              
              <span style={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  ...styles.pageButton,
                  ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
                }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Help Drawer */}
      {/* <HelpDrawer 
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.employeeList}
      /> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1400px',
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
  addButton: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  filters: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  searchInput: {
    flex: 1,
    minWidth: '250px',
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
  },
  filterSelect: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '16px',
    color: '#64748b',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#64748b',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
  },
  th: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    borderBottom: '2px solid #e2e8f0',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '16px',
    fontSize: '14px',
    color: '#1e293b',
  },
  nameLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontWeight: '600',
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
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
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    padding: '6px 10px',
    backgroundColor: 'transparent',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s ease',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
  },
  pageButton: {
    padding: '10px 20px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  pageButtonDisabled: {
    backgroundColor: '#cbd5e1',
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '600',
  },
};

export default EmployeeList;

