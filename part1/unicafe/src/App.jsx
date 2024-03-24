import { useState } from 'react'

import Heading from './Heading'
import Button from './Button'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad

  const avg = (good * 1 + neutral * 0 + bad * -1) / all

  const positive = (good * 1) / all + ' %'

  const handleGoodClick = () => setGood(good + 1)

  const handleNeutralClick = () => setNeutral(neutral + 1)

  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Heading title="give feedback" />
      <Button onClick={handleGoodClick} title="good" />
      <Button onClick={handleNeutralClick} title="neutral" />
      <Button onClick={handleBadClick} title="bad" />
      <Heading title="statistics" />
      <Statistics
        avg={avg}
        positive={positive}
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
