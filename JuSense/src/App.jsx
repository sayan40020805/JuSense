import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PollProvider } from './context/PollContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreatePollPage from './pages/CreatePollPage';
import MyPollsPage from './pages/MyPollsPage';
import PollVotePage from './pages/PollVotePage';
import PollResultsPage from './pages/PollResultsPage';
import Header from './components/Common/Header';
import ProtectedRoute from './components/Common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <PollProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          <Route path="/create" element={
            <ProtectedRoute>
              <CreatePollPage />
            </ProtectedRoute>
          } />
          <Route path="/mypolls" element={
            <ProtectedRoute>
              <MyPollsPage />
            </ProtectedRoute>
          } />
          <Route path="/poll/:id" element={<PollVotePage />} />
          <Route path="/poll/:id/results" element={<PollResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </PollProvider>
    </AuthProvider>
  );
}

export default App;
