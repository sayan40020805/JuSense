import { usePolls } from '../context/PollContext';
import { useAuth } from '../hooks/useAuth';
import PollList from '../components/Poll/PollList';
import '../styles/HomePage.css';

const HomePage = () => {
  const { polls } = usePolls();
  const { isAuthenticated, user } = useAuth();

  // Show user's polls if authenticated
  const visiblePolls = polls.filter(poll =>
    isAuthenticated && poll.creator._id === user?.id
  );

  return (
    <div className="home-page">
      <div className="container">
        <h1>Welcome to Quick Polls</h1>
        <p>Create polls and get instant feedback from your friends!</p>
        {visiblePolls.length > 0 ? (
          <PollList polls={visiblePolls} />
        ) : (
          <div className="empty-state">
            <h2>No polls yet</h2>
            <p>Be the first to create a poll!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
