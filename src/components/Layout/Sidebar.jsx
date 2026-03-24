// Sidebar Component
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h2 style={styles.logoText}>EMS</h2>
        <p style={styles.logoSubtext}>Employee Management</p>
      </div>
      
      <nav style={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              ...styles.navItem,
              ...(isActive(item.path) ? styles.navItemActive : {})
            }}
          >
            <span style={styles.icon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    backgroundColor: '#1e293b',
    color: '#fff',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  logo: {
    padding: '30px 20px',
    borderBottom: '1px solid #334155',
  },
  logoText: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#60a5fa',
  },
  logoSubtext: {
    margin: '5px 0 0 0',
    fontSize: '12px',
    color: '#94a3b8',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '15px 20px',
    textDecoration: 'none',
    color: '#cbd5e1',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    borderLeft: '4px solid transparent',
  },
  navItemActive: {
    backgroundColor: '#334155',
    color: '#fff',
    borderLeftColor: '#60a5fa',
  },
  icon: {
    marginRight: '12px',
    fontSize: '20px',
  },
};

export default Sidebar;

