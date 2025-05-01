import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DefinePage.css';

const assignments = {
  'Homework-1': [
    {
      question: 'What is the main goal of supervised learning?',
      options: ['A. Discover hidden patterns in data', 'B. Predict output from input data', 'C. Reduce dimensionality', 'D. Generate new samples']
    },
    {
      question: 'Which algorithm is typically used for classification problems?',
      options: ['A. K-Means Clustering', 'B. PCA', 'C. Decision Tree', 'D. DBSCAN']
    },
    {
      question: 'What does a high bias in a model typically lead to?',
      options: ['A. Overfitting', 'B. Underfitting', 'C. Better generalization', 'D. More accuracy']
    },
    {
      question: 'Which of the following is a type of neural network?',
      options: ['A. KNN', 'B. SVM', 'C. CNN', 'D. Naive Bayes']
    },
    {
      question: 'What is the purpose of a loss function in machine learning?',
      options: ['A. To store the model\'s weights', 'B. To measure model performance', 'C. To generate training data', 'D. To increase accuracy manually']
    }
  ],
  'Homework-2': [
    { question: 'Explain the concept of overfitting in machine learning.' },
    { question: 'Describe two techniques to prevent overfitting.' },
    { question: 'What is the difference between classification and regression tasks?' },
    { question: 'Define bias-variance tradeoff with an example.' },
    { question: 'Explain the role of activation functions in neural networks.' }
  ]
};

const DefinePage = () => {
  const [selected, setSelected] = useState('Homework-1');

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

      {/* Assignment Selector */}
      <div className="assignment-tabs">
        {Object.keys(assignments).map((hw) => (
          <button
            key={hw}
            className={`assignment-btn ${selected === hw ? 'active' : ''}`}
            onClick={() => setSelected(hw)}
          >
            {hw}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="home-container">
        {/* Left Column: Questions */}
        <div className="home-left">
          <h2>📘 {selected}</h2>

          {assignments[selected].map((q, i) => (
            <div key={i} className="question-block">
              <p><strong>{i + 1}. {q.question}</strong></p>
              {q.options ? (
                <ul>
                  {q.options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {/* Return to AnalyzePage Button */}
          <div className="return-btn-container">
            <Link to="/analyze" className="return-home-btn">← Back</Link>
          </div>
        </div>

        {/* Right Column: Grading Criteria */}
        <div className="home-right">
          <div className="info-box">
            <h3>🧮 Grading Criteria</h3>
            {selected === 'Homework-1' ? (
              <ul>
                <li>Each MCQ carries 2 points.</li>
                <li>Only one correct option per question.</li>
                <li>No partial marking.</li>
                <li>Total score is out of {assignments[selected].length * 2}.</li>
              </ul>
            ) : (
              <ul>
                <li>Each descriptive question carries 5 points.</li>
                <li>Marks are based on clarity, completeness, and correctness.</li>
                <li>Partial marks may be awarded.</li>
                <li>Total score is out of {assignments[selected].length * 5}.</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefinePage;
