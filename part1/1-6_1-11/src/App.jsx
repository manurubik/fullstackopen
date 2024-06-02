import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;

const Button = (props) => {
  // Step 5 => Done since Step 1 (1.6)
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  // Step 3 => Done since Step 1 (1.6)
  let total = props.good + props.neutral + props.bad;
  let avg = (props.good * 1 + props.neutral * 0 + props.bad * -1) / total;
  let porcentaje = (props.good / total) * 100;

  if (total !== 0) {
    return (
      <table>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={avg} />
        <StatisticLine text="positive" value={porcentaje} />
      </table>
    );
  } else {
    return "No feedback given";
  }
};

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> <td> {props.value}</td>
    </tr>
  );
};
