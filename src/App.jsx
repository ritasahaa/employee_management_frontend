// Root App Component
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeList from './pages/EmployeeList.jsx';
import AddEmployee from './pages/AddEmployee.jsx';
import EditEmployee from './pages/EditEmployee.jsx';
import EmployeeDetails from './pages/EmployeeDetails.jsx';
import Layout from './components/Layout/Layout.jsx';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/add" element={<AddEmployee />} />
                <Route path="/employees/edit/:id" element={<EditEmployee />} />
                <Route path="/employees/:id" element={<EmployeeDetails />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;

