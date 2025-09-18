import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../constants';

const PollContext = createContext();

export const usePolls = () => {
  const context = useContext(PollContext);
  if (!context) {
    throw new Error('usePolls must be used within a PollProvider');
  }
  return context;
};

export const PollProvider = ({ children }) => {
  const [polls, setPolls] = useState([]);
  const { user, logout } = useAuth();

  const getAuthHeaders = () => {
    return user?.token ? { Authorization: `Bearer ${user.token}` } : {};
  };

  const createPoll = async (pollData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/polls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(pollData),
      });
      if (response.status === 401) {
        logout();
        throw new Error('Authentication failed, please login again');
      }
      if (!response.ok) {
        throw new Error('Failed to create poll');
      }
      const newPoll = await response.json();
      setPolls(prev => [...prev, newPoll]);
      return newPoll;
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  };

  const voteOnPoll = async (pollId, optionIndex) => {
    try {
      const response = await fetch(`${API_BASE_URL}/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ optionIndex }),
      });
      if (response.status === 401) {
        logout();
        throw new Error('Authentication failed, please login again');
      }
      if (!response.ok) {
        throw new Error('Failed to vote on poll');
      }
      const updatedPoll = await response.json();
      setPolls(prev => prev.map(poll => poll._id === pollId ? updatedPoll : poll));
      return updatedPoll;
    } catch (error) {
      console.error('Error voting on poll:', error);
      throw error;
    }
  };

  const getPollById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/polls/${id}`);
      if (!response.ok) {
        throw new Error('Poll not found');
      }
      const poll = await response.json();
      return poll;
    } catch (error) {
      console.error('Error fetching poll:', error);
      throw error;
    }
  };

  const getPollsByUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/polls/my`, {
        headers: getAuthHeaders(),
      });
      if (response.status === 401) {
        logout();
        throw new Error('Authentication failed, please login again');
      }
      if (!response.ok) {
        throw new Error('Failed to fetch polls');
      }
      const userPolls = await response.json();
      setPolls(userPolls);
      return userPolls;
    } catch (error) {
      console.error('Error fetching user polls:', error);
      throw error;
    }
  };

  const deletePoll = async (pollId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/polls/${pollId}`, {
        method: 'DELETE',
        headers: {
          ...getAuthHeaders(),
        },
      });
      if (response.status === 401) {
        logout();
        throw new Error('Authentication failed, please login again');
      }
      if (!response.ok) {
        throw new Error('Failed to delete poll');
      }
      setPolls(prev => prev.filter(poll => poll._id !== pollId));
    } catch (error) {
      console.error('Error deleting poll:', error);
      throw error;
    }
  };

  const value = {
    polls,
    createPoll,
    voteOnPoll,
    getPollById,
    getPollsByUser,
    deletePoll,
  };

  return (
    <PollContext.Provider value={value}>
      {children}
    </PollContext.Provider>
  );
};
