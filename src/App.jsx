// Updated App.js - Added routes for courses
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Admin from './pages/admin/AdminLayout';
import CreateBranch from './componets/Branche/BranchForm'; 
import CourseForm from './componets/Courses/CourseForm'; // Adjust path as needed for CourseForm
// check fro the Update
const AdminRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Admin /> : <Navigate to="/signin" replace />;
};

const App = () => {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Protected /admin subtree: Admin renders layout + Outlet */}
        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="branches/create" element={<CreateBranch />} />
          <Route path="branches/edit/:id" element={<CreateBranch isEdit={true} />} />
          <Route path="courses/create" element={<CourseForm />} />
          <Route path="courses/edit/:id" element={<CourseForm isEdit={true} />} />
          {/* No index route needed; on /admin, Outlet renders nothing (tabs show) */}
          {/* Add more sub-routes here if needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;