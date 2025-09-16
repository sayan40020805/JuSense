import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../Common/Button';
import '../../styles/AuthForm.css';

const SignupForm = () => {
  const { signup } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError('');
    try {
      await signup(username, email, password);
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      {error && <div className="error">{error}</div>}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
        autoComplete="new-password"
      />
      <Button type="submit">Sign Up</Button>
    </form>
  );
};

export default SignupForm;
