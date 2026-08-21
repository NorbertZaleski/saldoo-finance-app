import './App.css'
import {Route, Routes, Navigate} from "react-router-dom";

import MainLayout from './components/layout/MainLayout';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BudgetPage from './pages/BudgetPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalysisPage from './pages/AnalysisPage';
import EducationPage from './pages/EducationPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<MainLayout />}>
        <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
        <Route path="/app/dashboard" element={<DashboardPage />} />
        <Route path="/app/budgets" element={<BudgetPage />} />
        <Route path="/app/transactions" element={<TransactionsPage />} />
        <Route path="/app/analysis" element={<AnalysisPage />} />
        <Route path="/app/education" element={<EducationPage />} />
        <Route path="/app/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<div>Strona nie znaleziona</div>} />
    </Routes>
  )
};

export default App;
