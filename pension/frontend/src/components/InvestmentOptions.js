import React, { useState, useEffect } from 'react';

const InvestmentOptions = ({ onSelect, value }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch investment options from the smart contract
      // For now, we'll use dummy data
      const dummyOptions = [
        { id: 1, name: 'Low Risk', riskLevel: 2 },
        { id: 2, name: 'Medium Risk', riskLevel: 5 },
        { id: 3, name: 'High Risk', riskLevel: 8 },
      ];
      setOptions(dummyOptions);
    } catch (error) {
      console.error('Error fetching investment options:', error);
      setError('Failed to load investment options. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading investment options...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <select onChange={(e) => onSelect(e.target.value)} value={value}>
      <option value="">Select an investment option</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name} (Risk: {option.riskLevel}/10)
        </option>
      ))}
    </select>
  );
};

export default InvestmentOptions;
