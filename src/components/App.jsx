import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import React, { useState } from 'react';
import { Notification } from './Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = feedback;

  const total = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / total) * 100);
  };

  const handleFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const options = Object.keys(feedback);

  return (
    <div>
      <Section title={'Please leave your feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>
      <Section title={'Statistics'}>
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            percentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};