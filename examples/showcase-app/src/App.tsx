import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ButtonsPage from './pages/components/ButtonsPage';
import InputsPage from './pages/components/InputsPage';
import CardsPage from './pages/components/CardsPage';
import AlertsPage from './pages/components/AlertsPage';
import ModalsPage from './pages/components/ModalsPage';
import TabsPage from './pages/components/TabsPage';
import FormPage from './pages/components/FormPage';
import TablePage from './pages/components/TablePage';
import NavigationPage from './pages/components/NavigationPage';
import AnimationsPage from './pages/components/AnimationsPage';
import ChartsPage from './pages/components/ChartsPage';
import ThemingPage from './pages/ThemingPage';
import I18nPage from './pages/I18nPage';
import FormValidationPage from './pages/FormValidationPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="components/buttons" element={<ButtonsPage />} />
        <Route path="components/inputs" element={<InputsPage />} />
        <Route path="components/cards" element={<CardsPage />} />
        <Route path="components/alerts" element={<AlertsPage />} />
        <Route path="components/modals" element={<ModalsPage />} />
        <Route path="components/tabs" element={<TabsPage />} />
        <Route path="components/forms" element={<FormPage />} />
        <Route path="components/tables" element={<TablePage />} />
        <Route path="components/navigation" element={<NavigationPage />} />
        <Route path="components/animations" element={<AnimationsPage />} />
        <Route path="components/charts" element={<ChartsPage />} />
        <Route path="theming" element={<ThemingPage />} />
        <Route path="i18n" element={<I18nPage />} />
        <Route path="form-validation" element={<FormValidationPage />} />
      </Route>
    </Routes>
  );
};

export default App;