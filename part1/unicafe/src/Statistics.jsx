import StatisticLine from "./StatisticLine"

const Statistics = ({ avg, positive, good, bad, neutral }) => {
    if (!isNaN(avg)) {
        return (
            <table>
                <tbody>
                    <StatisticLine title="good" value={good} />
                    <StatisticLine title="neutral" value={neutral} />
                    <StatisticLine title="bad" value={bad} />
                    <StatisticLine title="avg" value={avg} />
                    <StatisticLine title="positive" value={positive} />
                </tbody>       
            </table>
        )
    } 
    
    return <p>No feedback given</p>
}


export default Statistics