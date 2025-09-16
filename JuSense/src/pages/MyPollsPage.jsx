import { useState, useEffect } from 'react';
import { usePolls } from '../context/PollContext';
import { useAuth } from '../hooks/useAuth';
import PollList from '../components/Poll/PollList';
import '../styles/MyPollsPage.css';

const MyPollsPage = () => {
  const { getPollsByUser } = usePolls();
  const { user } = useAuth();
  const [myPolls, setMyPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const polls = await getPollsByUser();
        setMyPolls(polls);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchPolls();
    }
  }, [getPollsByUser, user]);

  if (loading) {
    return <div className="loading">Loading polls...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-polls-page">
      <div className="container">
        <h1>My Polls</h1>
        {myPolls.length > 0 ? (
          <PollList polls={myPolls} showShare={true} />
        ) : (
          <div className="empty-state">
            <h2>You haven't created any polls yet</h2>
            <p>Create your first poll to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPollsPage;
