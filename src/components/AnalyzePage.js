import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // ⬅ Add useNavigate
import '../styles/AnalyzePage.css';

const AnalyzePage = () => {
    const navigate = useNavigate(); // ⬅ Hook for programmatic navigation

    const handleViewQuestionsClick = () => {
      navigate('/define'); // ⬅ Navigates to DefinePage
    };
  return (
    <div className="analyze-wrapper">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo-link">
              <h1>AI Homework Grader</h1>
            </Link>
          </div>
          <div className="header-right">
            <Link to="/define" className="header-btn">Define Homework and Grading</Link>
            <Link to="/analyze" className="header-btn">Submit Grades and Analyze</Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="analyze-container">
        <div className="upload-section">
          <div className="upload-box">
            <h3>Questions</h3>
            <p>Click to view Questions</p>
            <button onClick={handleViewQuestionsClick}>View Questions</button>
          </div>
          <div className="upload-box">
            <h3>Rubric</h3>
            <p>Click to view Grading Rubric</p>
            <button onClick={() => navigate('/rubric')}>View Rubric</button>
          </div>
          <div className="upload-box">
            <h3>Solutions</h3>
            <p>Click to view Solutions</p>
            <button onClick={() => navigate('/solutions')}>View Solutions</button>
          </div>
          <div className="upload-box">
            <h3>Student's Answers</h3>
            <p>Click to view Answers</p>
            <button onClick={() => navigate('/responses')}>View Student's Answers</button>
          </div>
        </div>

        <div className="instructions-section">
          <h2>Grading Portal Steps</h2>
          <ol>
            <li><strong>View Questions:</strong> View questions and grading criteria.</li>
            <li><strong>View Rubric:</strong> For descriptive answers grading.</li>
            <li><strong>View Solutions:</strong> View solutions for each homework.</li>
            <li><strong>View Student's Responses:</strong> Click to see the grades for each student.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AnalyzePage;
