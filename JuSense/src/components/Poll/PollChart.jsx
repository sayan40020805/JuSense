import { useMemo } from 'react';
import '../../styles/PollChart.css';

const PollChart = ({ poll }) => {
  const totalVotes = useMemo(() => {
    return poll.options.reduce((sum, option) => sum + option.votes, 0);
  }, [poll.options]);

  const percentages = useMemo(() => {
    return poll.options.map(option => totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0);
  }, [poll.options, totalVotes]);

  const votersByOption = useMemo(() => {
    const voters = {};
    poll.voters.forEach(voter => {
      if (!voters[voter.optionIndex]) {
        voters[voter.optionIndex] = [];
      }
      if (voter.user && voter.user.username) {
        voters[voter.optionIndex].push(voter.user.username);
      }
    });
    return voters;
  }, [poll.voters]);

  return (
    <div className="poll-chart">
      <h3>Results</h3>
      <div className="chart-container">
        {poll.options.map((option, index) => (
          <div key={index} className="chart-item">
            <div className="option-label">
              <span className="option-text">{option.text}</span>
              <span className="vote-count">{option.votes} votes</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${percentages[index]}%` }}
              ></div>
            </div>
            <span className="percentage">{percentages[index].toFixed(1)}%</span>
            {votersByOption[index] && votersByOption[index].length > 0 && (
              <div className="voters-list">
                <span className="voters-label">Voters: </span>
                <span className="voters-names">{votersByOption[index].join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="total-votes">
        Total votes: {totalVotes}
      </div>
    </div>
  );
};

export default PollChart;
