import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/StudentResponsesPage.css';

// Define correct answers for each homework
const homeworkKeys = ['Homework-1', 'Homework-2'];

const correctAnswers = {
  'Homework-1': ['B', 'C', 'B', 'C', 'B'],
  'Homework-2': [] // No objective grading for descriptive questions
};

// Student responses per homework
const studentResponses = {
  'Homework-1': [
    { id: 1, name: 'Student 1', response: ['B', 'C', 'B', 'C', 'B'] },
    { id: 2, name: 'Student 2', response: ['A', 'C', 'A', 'C', 'B'] },
    { id: 3, name: 'Student 3', response: ['B', 'D', 'B', 'B', 'C'] }
  ],
  'Homework-2': [
    { id: 1, name: 'Student 1', response: [] },
    { id: 2, name: 'Student 2', response: [] },
    { id: 3, name: 'Student 3', response: [] }
  ]
};

const StudentResponsesPage = () => {
  const [selectedHomework, setSelectedHomework] = useState('Homework-1');

  const students = studentResponses[selectedHomework];

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
            <Link to="/define" className="header-btn">
              Define Homework and Grading
            </Link>
            <Link to="/analyze" className="header-btn">
              Submit Grades and Analyze
            </Link>
          </div>
        </div>
      </header>

      {/* Homework Switch Tabs */}
      <div className="assignment-tabs">
        {homeworkKeys.map((hw) => (
          <button
            key={hw}
            className={`assignment-btn ${selectedHomework === hw ? 'active' : ''}`}
            onClick={() => setSelectedHomework(hw)}
          >
            {hw}
          </button>
        ))}
      </div>

      <div className="home-container student-container">
        <h2>📥 {selectedHomework} – Student Responses</h2>

        <div className="student-cards">
          {students.map((student) => (
            <Link
              to={`/result/${student.id}?homework=${selectedHomework}`}
              key={student.id}
              className="student-card-link"
            >
              <div className="student-card">
                <div className="student-thumbnail">👤</div>
                <h3>{student.name}</h3>
                {student.response.length > 0 ? (
                  <p><strong>Answers:</strong> {student.response.join(', ')}</p>
                ) : (
                  <p><em>Descriptive answers submitted</em></p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Return Button */}
        <div className="return-btn-container" style={{ marginTop: '30px' }}>
          <Link to="/analyze" className="return-home-btn">← Back</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentResponsesPage;
