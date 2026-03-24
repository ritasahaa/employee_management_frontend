# Employee Management Dashboard - Frontend

Frontend application for the Employee Management Dashboard built with React, Vite, and React Router.

## Setup Instructions

### Installation

```bash
npm install
```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

Production build:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

- `src/` - Source code
  - `main.jsx` - Application entry point
  - `App.jsx` - Root component with routing
  - `components/` - Reusable components
    - `Layout/` - Layout components (Sidebar, Header, Layout)
  - `pages/` - Page components
    - `Login.jsx` - Login page
    - `Dashboard.jsx` - Dashboard with statistics
    - `EmployeeList.jsx` - Employee list with filters
    - `AddEmployee.jsx` - Add new employee form
    - `EditEmployee.jsx` - Edit employee form
    - `EmployeeDetails.jsx` - Employee details view
  - `services/` - API service calls
    - `api.js` - Axios configuration
    - `employeeService.js` - Employee API functions
  - `context/` - React context providers
    - `AuthContext.jsx` - Authentication state management
- `public/` - Static files
- `index.html` - HTML template
- `vite.config.js` - Vite configuration

## Available Pages

### Login (`/login`)
- Login form with email and password
- Demo credentials display
- Form validation

### Dashboard (`/dashboard`)
- Statistics cards (total, active, inactive employees, departments)
- Quick action cards
- Navigation shortcuts

### Employee List (`/employees`)
- Employee table with all details
- Search functionality
- Department filter
- Status filter
- Pagination controls
- Action buttons (View, Edit, Toggle Status, Delete)

### Add Employee (`/employees/add`)
- Complete employee registration form
- Field validation
- Department and status selection

### Edit Employee (`/employees/edit/:id`)
- Pre-filled form with employee data
- Update functionality
- Validation

### Employee Details (`/employees/:id`)
- Complete employee information display
- Action buttons (Edit, Toggle Status, Delete)
- Professional card layout

## Features Implemented

### UI/UX
- ✅ Responsive layout with sidebar and header
- ✅ Modern, clean design
- ✅ Card-based components
- ✅ Status badges
- ✅ Loading states
- ✅ Error handling UI
- ✅ Form validation UI
- ✅ Pagination controls

### Routing
- ✅ React Router setup
- ✅ Protected routes
- ✅ Navigation between pages

### State Management
- ✅ Authentication context
- ✅ Local storage for persistence

## Demo Credentials

- **Email:** admin@example.com
- **Password:** admin123

## API Integration Status

⚠️ **IMPORTANT**: The API integration is intentionally incomplete. This is a candidate assignment project.

The following API integrations need to be implemented:
- Login API
- Fetch employees with filters
- Search and pagination
- Create employee
- Update employee
- Delete employee
- Get employee details
- Toggle employee status

See `src/services/employeeService.js` for TODO comments marking where API integration is needed.

## Technologies Used

- React 18
- Vite 5
- React Router 6
- Axios
- Inline CSS (for simplicity)

