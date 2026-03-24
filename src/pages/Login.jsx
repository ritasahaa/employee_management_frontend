// Login Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import {loginUser} from "../services/employeeService.js";
// import HelpDrawer from '../components/HelpDrawer.jsx';
// import { helpContent } from '../components/helpContent.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [helpOpen, setHelpOpen] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Integrate with loginUser API from employeeService ----
      const data = await loginUser(email, password);

      // user save in context ----
      login(data);

      // redirect ----
      navigate("/dashboard");

      // TODO: Handle loading state during API call
      // TODO: Handle API errors and display appropriate messages
      // TODO: On success, call login(userData) and navigate to dashboard
      
      // Temporary mock login for UI testing
      // setTimeout(() => {
      //   if (email === 'admin@example.com' && password === 'admin123') {
      //     const mockUser = {
      //       id: '1',
      //       name: 'Admin User',
      //       email: 'admin@example.com',
      //       role: 'admin',
      //       token: 'mock-token-' + Date.now()
      //     };
      //     login(mockUser);
      //     navigate('/dashboard');
      //   } else {
      //     setError('Invalid email or password');
      //   }
      //   setLoading(false);
      // }, 500);
    } catch (err) {
      setError(err || 'Login failed. Please try again.');
    }finally {
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

      <div style={styles.loginBox}>
        <div style={styles.header}>
          <h1 style={styles.title}>Employee Management System</h1>
          <p style={styles.subtitle}>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <div style={styles.hint}>
            <p style={styles.hintText}>Demo Credentials:</p>
            <p style={styles.hintText}>Email: admin@example.com</p>
            <p style={styles.hintText}>Password: admin123</p>
          </div>
        </form>
      </div>

      {/* Help Drawer */}
      {/* <HelpDrawer 
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        content={helpContent.login}
      /> */}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
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
  loginBox: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    margin: 0,
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
  },
  subtitle: {
    margin: '10px 0 0 0',
    fontSize: '14px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
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
  input: {
    padding: '12px 16px',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  buttonDisabled: {
    backgroundColor: '#94a3b8',
    cursor: 'not-allowed',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center',
  },
  hint: {
    marginTop: '10px',
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    textAlign: 'center',
  },
  hintText: {
    margin: '4px 0',
    fontSize: '13px',
    color: '#64748b',
  },
};

export default Login;

