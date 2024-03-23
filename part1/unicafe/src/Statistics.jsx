import Feedback from "./Feedback"

const Statistics = ({ avg, positive, good, bad, neutral }) => {
    return (
        <>
            <Feedback title="good" feedback={good} />
            <Feedback title="neutral" feedback={neutral} />
            <Feedback title="bad" feedback={bad} />
            <Feedback title="avg" feedback={avg} />
            <Feedback title="positive" feedback={positive} />
        </>
    )
}


export default Statistics