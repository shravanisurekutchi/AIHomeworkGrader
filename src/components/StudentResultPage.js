import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import '../styles/StudentResultPage.css';

// Correct answers (only for Homework-1)
const correctAnswers = {
  'Homework-1': ['B', 'C', 'B', 'C', 'B'],
  'Homework-2': [] // Descriptive - no objective answers
};

// Student Data
const studentData = {
  'Homework-1': {
    1: { name: 'Student 1', response: ['B', 'C', 'B', 'C', 'B'] },
    2: { name: 'Student 2', response: ['A', 'C', 'A', 'C', 'B'] },
    3: { name: 'Student 3', response: ['B', 'D', 'B', 'B', 'C'] }
  },
  'Homework-2': {
    1: {
      name: 'Student 1',
      descriptiveAnswers: [
        "Overfitting happens when the model memorizes data and doesn't generalize.",
        "Regularization and cross-validation help to prevent overfitting.",
        "Classification predicts labels, regression predicts continuous outputs.",
        "Bias-variance tradeoff balances underfitting and overfitting.",
        "Activation functions introduce non-linearity into neural networks."
      ]
    },
    2: {
      name: 'Student 2',
      descriptiveAnswers: [
        "Overfitting is memorizing data without generalizing.",
        "Early stopping and dropout can prevent overfitting.",
        "Classification groups items, regression predicts values.",
        "Bias-variance tradeoff means balancing two types of errors.",
        "Sigmoid and ReLU are activation functions."
      ]
    },
    3: {
      name: 'Student 3',
      descriptiveAnswers: [
        "Overfitting happens when the model is too close to training data.",
        "Using regularization like L1/L2 helps against overfitting.",
        "Classification = classes, Regression = continuous numbers.",
        "Bias-variance tradeoff optimizes between bias and variance.",
        "Activation functions like ReLU make the network learn complex functions."
      ]
    }
  }
};

// Auto-grading logic for descriptive answers
const autoGradeAnswer = (answer) => {
  let score = 5;
  if (answer.length < 50) score -= 1;
  if (!answer.toLowerCase().includes('example') && answer.length < 100) score -= 1;
  if (score < 2) score = 2;
  return score;
};

// Overall feedback based on % score
const generateOverallFeedback = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;

  if (percentage >= 90) return "Outstanding work! You demonstrate a deep understanding.";
  if (percentage >= 75) return "Very good effort! Minor improvements needed.";
  if (percentage >= 60) return "Good attempt. Try to add more examples and clarity.";
  return "Needs improvement. Review concepts and explain more clearly.";
};

// For Homework-1 (MCQ feedback)
const getMCQAnalysis = (student, correct) => {
  const wrongQuestions = student.response
    .map((ans, i) => ans !== correct[i] ? i + 1 : null)
    .filter(Boolean);

  const score = student.response.reduce((acc, ans, i) => acc + (ans === correct[i] ? 2 : 0), 0);

  if (score === 10) return "Excellent work! All answers correct.";
  if (score >= 8) return `Good job! Revise Question(s) ${wrongQuestions.join(', ')}.`;
  if (score >= 6) return `Average performance. Review topics from Question(s) ${wrongQuestions.join(', ')}.`;
  return `Needs improvement. Revisit Questions ${wrongQuestions.join(', ')} and practice more.`;
};

const StudentResultPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const homework = searchParams.get('homework') || 'Homework-1';

  const student = studentData[homework]?.[id];
  const storageKey = `student-${id}-${homework}`;

  const [customScores, setCustomScores] = useState([]);
  const [customFeedback, setCustomFeedback] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (student) {
      const savedData = JSON.parse(localStorage.getItem(storageKey));
      if (savedData) {
        setCustomScores(savedData.scores || []);
        setCustomFeedback(savedData.feedback || "");
      } else {
        if (homework === 'Homework-2') {
          setCustomScores(student.descriptiveAnswers.map(ans => autoGradeAnswer(ans)));
          setCustomFeedback(""); // empty initially
        }
      }
    }
  }, [id, homework, student, storageKey]);

  if (!student) {
    return <div style={{ padding: '50px' }}>Student not found for {homework}.</div>;
  }

  const correct = correctAnswers[homework];
  const isObjective = correct.length > 0;

  const score = isObjective
    ? student.response.reduce((acc, ans, i) => acc + (ans === correct[i] ? 2 : 0), 0)
    : customScores.reduce((acc, val) => acc + Number(val), 0);

  const maxScore = isObjective
    ? correct.length * 2
    : (student.descriptiveAnswers.length * 5);

  const defaultFeedback = isObjective
    ? getMCQAnalysis(student, correct)
    : generateOverallFeedback(score, maxScore);

  const handleScoreChange = (index, value) => {
    const updatedScores = [...customScores];
    updatedScores[index] = Math.min(Math.max(Number(value), 0), 5);
    setCustomScores(updatedScores);
  };

  const handleSave = () => {
    const saveData = {
      scores: customScores,
      feedback: customFeedback
    };
    localStorage.setItem(storageKey, JSON.stringify(saveData));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="result-wrapper">
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4BB543',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '6px',
          zIndex: 1000
        }}>
          ✅ Saved Successfully!
        </div>
      )}

      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo-link"><h1>AI Homework Grader</h1></Link>
          </div>
          <div className="header-right">
            <Link to="/define" className="header-btn">Define Homework and Grading</Link>
            <Link to="/analyze" className="header-btn">Submit Grades and Analyze</Link>
          </div>
        </div>
      </header>

      <div className="result-content">
        <h2>📊 Result for {student.name} – {homework}</h2>

        {/* Objective Homework */}
        {isObjective ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Q#</th>
                  <th>Student's Answer</th>
                  <th>Correct Answer</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {student.response.map((ans, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{ans}</td>
                    <td>{correct[idx]}</td>
                    <td>{ans === correct[idx] ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          /* Descriptive Homework */
          <>
            <h3>Descriptive Answers (Editable Scores):</h3>
            <ol>
              {student.descriptiveAnswers.map((ans, idx) => (
                <li key={idx} style={{ marginBottom: '15px' }}>
                  <p>{ans}</p>
                  <label>
                    Score:
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={customScores[idx]}
                      onChange={(e) => handleScoreChange(idx, e.target.value)}
                      style={{ width: '60px', marginLeft: '10px' }}
                    /> /5
                  </label>
                </li>
              ))}
            </ol>
          </>
        )}

        <h3>Total Score: {score} / {maxScore}</h3>

        {/* Editable Feedback */}
        <div className="feedback-box">
          <h4>📝 Overall Feedback:</h4>
          <textarea
            value={customFeedback || defaultFeedback}
            onChange={(e) => setCustomFeedback(e.target.value)}
            rows={5}
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          />
        </div>

        {/* Save Button */}
        {!isObjective && (
          <button
            onClick={handleSave}
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#3554d1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            💾 Save Scores and Feedback
          </button>
        )}

        <div style={{ marginTop: '30px' }}>
          <Link to="/responses" className="return-home-btn">← Back to Student Responses</Link>
        </div>
      </div>
    </div>
  );
};

export default StudentResultPage;
