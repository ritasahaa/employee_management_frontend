// Dashboard Page
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees } from "../services/employeeService.js";
// import HelpDrawer from '../components/HelpDrawer.jsx';
// import { helpContent } from '../components/helpContent.js';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    departments: 0,
  });
  // const [helpOpen, setHelpOpen] = useState(false);

  const fetchStats = async () => {
     try {
       const res = await getEmployees({
         page: 1,
         limit: 1000,
       });
        const employees = res.data || [];

        // total 
        const totalEmployees = employees.length;

        // active
        const activeEmployees = employees.filter(
           emp => emp.status === "active"
        ).length;

        // inactive
        const inactiveEmployees = employees.filter(
          emp => emp.status === "inactive"
        ).length;

        // unique department
        const departments = new Set(
          employees.map(emp => emp.department)
        ).size;
        
        setStats({
          totalEmployees,
          activeEmployees,
          inactiveEmployees,
          departments,
        });

     }catch(error) {
      console.error("Stats fetch failed",err);
     }
  }

  useEffect(() => {
    // TODO: Fetch dashboard statistics from backend
    // TODO: Calculate total, active, inactive employees
    // TODO: Count unique departments
    // TODO: Handle loading and error states
    
    // Temporary mock data for UI testing
   fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: '#3b82f6',
      bgColor: '#dbeafe',
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees,
      icon: '✅',
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Inactive Employees',
      value: stats.inactiveEmployees,
      icon: '⏸️',
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Departments',
      value: stats.departments,
      icon: '🏢',
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ];

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
        <h1 style={styles.title}>Dashboard</h1>
        <Link to="/employees/add" style={styles.addButton}>
          + Add Employee
        </Link>
      </div>

      <div style={styles.statsGrid}>
        {statCards.map((card, index) => (
          <div key={index} style={styles.statCard}>
            <div 
              style={{
                ...styles.iconBox,
                backgroundColor: card.bgColor,
                color: card.color,
              }}
            >
              <span style={styles.icon}>{card.icon}</span>
            </div>
            <div style={styles.statContent}>
              <p style={styles.statTitle}>{card.title}</p>
              <h2 style={{ ...styles.statValue, color: card.color }}>
                {card.value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.quickActions}>
        <h2 style={styles.sectionTitle}>Quick Actions</h2>
        <div style={styles.actionsGrid}>
          <Link to="/employees" style={styles.actionCard}>
            <span style={styles.actionIcon}>👥</span>
            <h3 style={styles.actionTitle}>View All Employees</h3>
            <p style={styles.actionDesc}>Browse and manage employee records</p>
          </Link>
          
          <Link to="/employees/add" style={styles.actionCard}>
            <span style={styles.actionIcon}>➕</span>
            <h3 style={styles.actionTitle}>Add New Employee</h3>
            <p style={styles.actionDesc}>Register a new employee in the system</p>
          </Link>
          
          <div style={styles.actionCard}>
            <span style={styles.actionIcon}>📊</span>
            <h3 style={styles.actionTitle}>Reports</h3>
            <p style={styles.actionDesc}>View employee statistics and reports</p>
          </div>
          
          <div style={styles.actionCard}>
            <span style={styles.actionIcon}>⚙️</span>
            <h3 style={styles.actionTitle}>Settings</h3>
            <p style={styles.actionDesc}>Configure system preferences</p>
          </div>
        </div>
      </div>

      {/* Help Drawer */}
      {/* <HelpDrawer 
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.dashboard}
      /> */}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
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
    transition: 'background-color 0.3s ease',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '40px',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconBox: {
    width: '60px',
    height: '60px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '28px',
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
    fontWeight: '500',
  },
  statValue: {
    margin: '8px 0 0 0',
    fontSize: '28px',
    fontWeight: '700',
  },
  quickActions: {
    marginTop: '40px',
  },
  sectionTitle: {
    margin: '0 0 20px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
  },
  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  actionCard: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  actionIcon: {
    fontSize: '32px',
    display: 'block',
    marginBottom: '12px',
  },
  actionTitle: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b',
  },
  actionDesc: {
    margin: 0,
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
  },
};

export default Dashboard;

