import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePolls } from '../context/PollContext';
import PollChart from '../components/Poll/PollChart';
import '../styles/PollVotePage.css';

const PollResultsPage = () => {
  const { id } = useParams();
  const { getPollById } = usePolls();
  const [poll, setPoll] = useState(null);
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
      } catch (err) {
        console.error('Error fetching poll:', err);
        setError(err.message || 'Failed to load poll');
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id, getPollById]);

  if (loading) {
    return <div className="loading">Loading poll...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!poll) {
    return <div className="error">Poll not found</div>;
  }

  return (
    <div className="poll-vote-page">
      <div className="container">
        <h1>{poll.question}</h1>
        <div className="results-section">
          <PollChart poll={poll} />
        </div>
      </div>
    </div>
  );
};

export default PollResultsPage;
