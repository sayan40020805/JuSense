import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { usePolls } from '../../context/PollContext';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import '../../styles/PollForm.css';

const PollForm = () => {
  const { createPoll } = usePolls();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 20) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || options.some(opt => !opt.trim())) {
      alert('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await createPoll({
        question,
        options: options.filter(opt => opt.trim()),
        isPublic,
      });
      // Reset form
      setQuestion('');
      setOptions(['', '']);
      setIsPublic(false);
      alert('Poll created successfully!');
      // Navigate to my polls
      navigate('/mypolls');
    } catch (err) {
      alert('Failed to create poll: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="poll-form" onSubmit={handleSubmit}>
      <h2>Create New Poll</h2>
      <label htmlFor="question">Question</label>
      <input
        id="question"
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Enter your question"
        required
      />
      <label>Options (2-20)</label>
      {options.map((option, index) => (
        <div key={index} className="option-input">
          <input
            type="text"
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            required
          />
          {options.length > 20 && (
            <button type="button" onClick={() => removeOption(index)} className="remove-option">
              ×
            </button>
          )}
        </div>
      ))}
      {options.length < 20 && (
        <Button type="button" onClick={addOption} variant="secondary">
          Add Option
        </Button>
      )}
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={e => setIsPublic(e.target.checked)}
        />
        Public poll (anyone can vote without login)
      </label>
      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Poll'}
      </Button>
    </form>
  );
};

export default PollForm;
