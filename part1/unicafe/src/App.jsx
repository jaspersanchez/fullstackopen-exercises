import { useState } from "react";

import Heading from "./Heading";
import Button from "./Button";
import Feedback from "./Feedback";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)
  
  return (
    <div>
      <Heading title='give feedback' />
      <Button onClick={handleGoodClick} title='good' />
      <Button onClick={handleNeutralClick} title='neutral' />
      <Button onClick={handleBadClick} title='bad' />
      <Heading title='statistics' />
      <Feedback title='good' feedback={good} />
      <Feedback title='neutral' feedback={neutral} />
      <Feedback title='bad' feedback={bad} />
    </div>
  )
}

export default App