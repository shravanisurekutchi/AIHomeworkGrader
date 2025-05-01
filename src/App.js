import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DefinePage from './components/DefinePage';
import AnalyzePage from './components/AnalyzePage';
import SolutionsPage from './components/SolutionsPage';
import StudentResponsesPage from './components/StudentResponsesPage';
import StudentResultPage from './components/StudentResultPage';
import RubricPage from './components/RubricPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/define" element={<DefinePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/responses" element={<StudentResponsesPage />} />
        <Route path="/result/:id" element={<StudentResultPage />} />
        <Route path="/rubric" element={<RubricPage />} />
      </Routes>
    </Router>
  );
}

export default App;
