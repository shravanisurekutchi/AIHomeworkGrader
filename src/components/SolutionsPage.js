import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SolutionsPage.css';

const solutions = {
  'Homework-1': [
    {
      question: 'What is the main goal of supervised learning?',
      answer: '✅ B. Predict output from input data'
    },
    {
      question: 'Which algorithm is typically used for classification problems?',
      answer: '✅ C. Decision Tree'
    },
    {
      question: 'What does a high bias in a model typically lead to?',
      answer: '✅ B. Underfitting'
    },
    {
      question: 'Which of the following is a type of neural network?',
      answer: '✅ C. CNN'
    },
    {
      question: 'What is the purpose of a loss function in machine learning?',
      answer: '✅ B. To measure model performance'
    }
  ],
  'Homework-2': [
    {
      question: 'Explain the concept of overfitting in machine learning.',
      answer: '✅ Overfitting occurs when a model performs well on training data but poorly on unseen data.'
    },
    {
      question: 'Describe two techniques to prevent overfitting.',
      answer: '✅ Regularization (L1/L2), Dropout, Early stopping, and Cross-validation help prevent overfitting.'
    },
    {
      question: 'What is the difference between classification and regression tasks?',
      answer: '✅ Classification predicts labels/categories; Regression predicts continuous numeric values.'
    },
    {
      question: 'Define bias-variance tradeoff with an example.',
      answer: '✅ Bias-variance tradeoff is the balance between underfitting and overfitting. Example: A simple model may underfit, a complex model may overfit.'
    },
    {
      question: 'Explain the role of activation functions in neural networks.',
      answer: '✅ Activation functions introduce non-linearity and help neural networks learn complex patterns.'
    }
  ]
};

const SolutionsPage = () => {
  const [selectedHomework, setSelectedHomework] = useState('Homework-1');

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

      {/* Homework Switch Tabs */}
      <div className="assignment-tabs">
        {Object.keys(solutions).map((hw) => (
          <button
            key={hw}
            className={`assignment-btn ${selectedHomework === hw ? 'active' : ''}`}
            onClick={() => setSelectedHomework(hw)}
          >
            {hw}
          </button>
        ))}
      </div>

      {/* Solutions Content */}
      <div className="home-container">
        <div className="home-left">
          <h2>✅ Solutions for {selectedHomework}</h2>

          {solutions[selectedHomework].map((item, index) => (
            <div className="question-block" key={index}>
              <p><strong>{index + 1}. {item.question}</strong></p>
              <p className="answer">{item.answer}</p>
            </div>
          ))}

          {/* Return Button */}
          <div className="return-btn-container" style={{ marginTop: '40px' }}>
            <Link to="/analyze" className="return-home-btn">← Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsPage;
