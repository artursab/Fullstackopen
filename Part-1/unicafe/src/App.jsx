import React, { useState } from 'react';

const Header = () => {
  return (
    <h2>
      Give feedback
    </h2>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
);

const Display = ({ value }) => <div>{value}</div>;

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;
  const average = totalFeedback === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / totalFeedback;
  const positivePercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100;

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <h3>Statistics</h3>
      <div>Good: <Display value={good} /></div>
      <div>Neutral: <Display value={neutral} /></div>
      <div>Bad: <Display value={bad} /></div>
      <div>Average: <Display value={average} /></div>
      <div>Positive: <Display value={positivePercentage} /></div>
    </div>
  );
};

export default App;
