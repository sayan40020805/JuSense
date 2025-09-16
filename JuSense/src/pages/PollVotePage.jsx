import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePolls } from '../context/PollContext';
import { useAuth } from '../hooks/useAuth';
import PollChart from '../components/Poll/PollChart';
import Button from '../components/Common/Button';
import '../styles/PollVotePage.css';

const PollVotePage = () => {
  const { id } = useParams();
  const { getPollById, voteOnPoll } = usePolls();
  const { user, isAuthenticated } = useAuth();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      if (!id || id === 'undefined' || id.trim() === '') {
        setError('Invalid poll ID');
        setLoading(false);
        return;
      }
      try {
        const fetchedPoll = await getPollById(id);
        if (!fetchedPoll) {
          setError('Poll not found');
          setLoading(false);
          return;
        }
        setPoll(fetchedPoll);
        if (isAuthenticated && fetchedPoll.voters.some(voter => voter.user && (voter.user === user.id || voter.user.toString() === user.id.toString()))) {
          setHasVoted(true);
        }
      } catch (err) {
        console.error('Error fetching poll:', err);
        setError(err.message || 'Failed to load poll');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id, getPollById, isAuthenticated, user]);

  const handleVote = async () => {
    if (selectedOption !== null) {
      if (!poll.isPublic && !isAuthenticated) {
        alert('You must be logged in to vote on private polls');
        return;
      }
      if (isAuthenticated && poll.voters.some(voter => voter.user === user.id || voter === user.id)) {
        alert('You have already voted on this poll');
        return;
      }
      try {
        const updatedPoll = await voteOnPoll(poll._id, selectedOption);
        setPoll(updatedPoll);
        setHasVoted(true);
      } catch (err) {
        alert('Failed to vote on poll: ' + err.message);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading poll...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!poll) {
    return <div className="error">Poll not found</div>;
  }

  const canVote = isAuthenticated;

  return (
    <div className="poll-vote-page">
      <div className="container">
        <h1>{poll.question}</h1>
        {!hasVoted && canVote ? (
          <div className="vote-section">
            <div className="options">
              {poll.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name="poll-option"
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  <span className="option-text">{option.text}</span>
                </label>
              ))}
            </div>
            <Button onClick={handleVote} disabled={selectedOption === null}>
              Vote
            </Button>
          </div>
        ) : (
          <div className="results-section">
            {hasVoted && <p className="vote-message">You have voted on this poll</p>}
            {!canVote && <p className="login-message">Please log in to vote on this poll</p>}
            <PollChart poll={poll} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PollVotePage;
