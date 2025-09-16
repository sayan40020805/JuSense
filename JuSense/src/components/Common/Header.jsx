import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from './Button';
import '../../styles/Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Quick Polls
        </Link>
        <nav className="nav">
          {isAuthenticated ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/create" className="nav-link">Create Poll</Link>
              <Link to="/mypolls" className="nav-link">My Polls</Link>
              <span className="user-info">Welcome, {user.username}</span>
              <Button onClick={handleLogout} variant="secondary">Logout</Button>
            </>
          ) : (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
