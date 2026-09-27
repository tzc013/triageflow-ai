import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell.jsx';
import LandingPage from './pages/LandingPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import InboxPage from './pages/InboxPage.jsx';
import HumanReviewPage from './pages/HumanReviewPage.jsx';
import HRWorkflowPage from './pages/HRWorkflowPage.jsx';
import ManagerWorkflowPage from './pages/ManagerWorkflowPage.jsx';
import UrgentWorkflowPage from './pages/UrgentWorkflowPage.jsx';
import ActivityLogPage from './pages/ActivityLogPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Cinematic Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Application Core Routes inside Shell */}
        <Route 
          path="/dashboard" 
          element={
            <AppShell>
              <DashboardPage />
            </AppShell>
          } 
        />

        <Route 
          path="/inbox" 
          element={
            <AppShell>
              <InboxPage />
            </AppShell>
          } 
        />

        <Route 
          path="/review" 
          element={
            <AppShell>
              <HumanReviewPage />
            </AppShell>
          } 
        />

        <Route 
          path="/workflows/hr" 
          element={
            <AppShell>
              <HRWorkflowPage />
            </AppShell>
          } 
        />

        <Route 
          path="/workflows/manager" 
          element={
            <AppShell>
              <ManagerWorkflowPage />
            </AppShell>
          } 
        />

        <Route 
          path="/workflows/urgent" 
          element={
            <AppShell>
              <UrgentWorkflowPage />
            </AppShell>
          } 
        />

        <Route 
          path="/activity" 
          element={
            <AppShell>
              <ActivityLogPage />
            </AppShell>
          } 
        />

        <Route 
          path="/settings" 
          element={
            <AppShell>
              <SettingsPage />
            </AppShell>
          } 
        />

        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
