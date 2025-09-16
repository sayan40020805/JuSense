import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/PollList.css';

const PollList = ({ polls, showShare = false }) => {
  const { user } = useAuth();

  if (!polls || polls.length === 0) {
    return <p className="no-polls">No polls available.</p>;
  }

  const copyShareLink = (pollId) => {
    const url = `${window.location.origin}/poll/${pollId}`;
    navigator.clipboard.writeText(url).then(() => {
      alert('Share link copied to clipboard!');
    });
  };

  return (
    <div className="poll-list">
      {polls.map(poll => (
        <div key={poll._id} className="poll-item">
          <Link to={showShare ? `/poll/${poll._id}/results` : `/poll/${poll._id}`} className="poll-question">
            {poll.question}
          </Link>
          <div className="poll-meta">
            <span>{poll.isPublic ? 'Public' : 'Private'}</span>
            <span>{new Date(poll.createdAt).toLocaleString()}</span>
            {showShare && poll.creator && poll.creator._id.toString() === user.id.toString() && (
              <button
                className="share-button"
                onClick={() => copyShareLink(poll._id)}
              >
                Share
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PollList;
