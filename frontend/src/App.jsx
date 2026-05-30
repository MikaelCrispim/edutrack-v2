import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import DashboardPage from './pages/DashboardPage';
import TasksPage from './pages/TasksPage';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout';
import SubjectList from './components/subjects/SubjectList';
import SubjectCreate from './components/subjects/SubjectCreate';
import SubjectEdit from './components/subjects/SubjectEdit';
import SubjectDetails from './pages/SubjectDetails';
import './App.css';

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<PasswordResetPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/subjects/new" element={<SubjectCreate />} />
            <Route path="/subjects/:id/edit" element={<SubjectEdit />} />
            <Route path="/subjects/:id" element={<SubjectDetails />} />
          </Route>
        </Route>

        {/* Redirect root to subjects */}
        <Route path="/" element={<Navigate to="/subjects" />} />
      </Routes>
    </div>
  );
}

export default App;
