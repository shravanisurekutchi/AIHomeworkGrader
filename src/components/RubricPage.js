import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RubricPage.css'; // We'll create this style

const RubricPage = () => {
  return (
    <div className="home-wrapper">
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

      {/* Rubric Content */}
      <div className="rubric-content">
        <h2>📚 Descriptive Answer Grading Rubric</h2>

        <table className="rubric-table">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Excellent (5)</th>
              <th>Good (4)</th>
              <th>Fair (3)</th>
              <th>Poor (2 or below)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Understanding</td>
              <td>Complete understanding of concept</td>
              <td>Good understanding with minor gaps</td>
              <td>Partial understanding</td>
              <td>Little or no understanding</td>
            </tr>
            <tr>
              <td>Clarity & Organization</td>
              <td>Clear, well-organized, easy to follow</td>
              <td>Generally clear, minor issues</td>
              <td>Somewhat disorganized</td>
              <td>Very disorganized, hard to understand</td>
            </tr>
            <tr>
              <td>Completeness</td>
              <td>Addresses all parts of the question</td>
              <td>Addresses most parts</td>
              <td>Addresses some parts</td>
              <td>Misses most parts</td>
            </tr>
            <tr>
              <td>Accuracy</td>
              <td>No factual errors</td>
              <td>Minor factual error</td>
              <td>Multiple factual errors</td>
              <td>Major factual errors</td>
            </tr>
            <tr>
              <td>Depth of Explanation</td>
              <td>Deep insights, examples</td>
              <td>Reasonable explanation</td>
              <td>Surface-level answer</td>
              <td>Superficial or off-topic answer</td>
            </tr>
          </tbody>
        </table>

        {/* Return Button */}
        <div style={{ marginTop: '30px' }}>
          <Link to="/analyze" className="return-home-btn">← Back</Link>
        </div>
      </div>
    </div>
  );
};

export default RubricPage;
