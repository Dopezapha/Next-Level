import React, { useState } from 'react';

const AdminDashboard = ({ setLoading, handleError }) => {
  const [retirementAge, setRetirementAge] = useState(65);
  const [optionName, setOptionName] = useState('');
  const [riskLevel, setRiskLevel] = useState(0);
  const [employerAddress, setEmployerAddress] = useState('');

  const updateRetirementAge = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's update-retirement-age function
      console.log('Updating retirement age to:', retirementAge);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const addInvestmentOption = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's add-investment-option function
      console.log('Adding investment option:', optionName, 'with risk level:', riskLevel);
      setOptionName('');
      setRiskLevel(0);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const registerEmployer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's register-employer function
      console.log('Registering employer:', employerAddress);
      setEmployerAddress('');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <h2>Admin Dashboard</h2>
      <form onSubmit={updateRetirementAge} className="retirement-age-form">
        <h3>Update Retirement Age</h3>
        <div className="form-group">
          <label htmlFor="retirementAge">Retirement Age</label>
          <input
            type="number"
            id="retirementAge"
            value={retirementAge}
            onChange={(e) => setRetirementAge(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <form onSubmit={addInvestmentOption} className="investment-option-form">
        <h3>Add Investment Option</h3>
        <div className="form-group">
          <label htmlFor="optionName">Option Name</label>
          <input
            type="text"
            id="optionName"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="riskLevel">Risk Level (0-10)</label>
          <input
            type="number"
            id="riskLevel"
            min="0"
            max="10"
            value={riskLevel}
            onChange={(e) => setRiskLevel(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Add Option</button>
      </form>
      <form onSubmit={registerEmployer} className="register-employer-form">
        <h3>Register Employer</h3>
        <div className="form-group">
          <label htmlFor="employerAddress">Employer Address</label>
          <input
            type="text"
            id="employerAddress"
            value={employerAddress}
            onChange={(e) => setEmployerAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
