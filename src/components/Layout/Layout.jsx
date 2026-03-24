// Layout Component
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const Layout = ({ children }) => {
  return (
    <div style={styles.layout}>
      <Sidebar />
      <div style={styles.mainContent}>
        <Header />
        <main style={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  mainContent: {
    marginLeft: '250px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: '30px',
    flex: 1,
  },
};

export default Layout;

