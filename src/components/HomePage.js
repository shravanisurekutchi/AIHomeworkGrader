import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
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

      <div className="home-container">
        <div className="home-left">
          <h2>AI Grading Assistant: <br />Revolutionize Your Grading Process</h2>
          <p>
            Utilize the power of AI to grade assignments and exams efficiently and accurately.
          </p>
          <div className="button-group">
          <Link to="/analyze" className="btn primary">Try it out! →</Link>
          </div>
        </div>

        <div className="home-right">
          <div className="info-box">
            <h3>How to Use AI Grading Assistant:</h3>
            <ol>
              <li><strong>Step 1:</strong> Define the homework and grading</li>
              <li><strong>Step 2:</strong> Grade submissions</li>
              <li><strong>Step 3:</strong> Provide analysis of results</li>
            </ol>
            <p><em>It’s that simple! Start grading with ease using our AI-powered tool.</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
