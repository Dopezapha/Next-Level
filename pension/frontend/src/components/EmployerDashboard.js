import React, { useState, useEffect } from 'react';
import InvestmentOptions from './InvestmentOptions';

const EmployerDashboard = ({ setLoading, handleError }) => {
  const [employerStatus, setEmployerStatus] = useState(false);
  const [contributionAmount, setContributionAmount] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    checkEmployerStatus();
  }, []);

  const checkEmployerStatus = async () => {
    try {
      setLoading(true);
      // Implement the logic to check employer status from the smart contract
      // For now, we'll use dummy data
      setEmployerStatus(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const contribute = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's employer-contribute function
      console.log('Contributing amount:', contributionAmount, 'to option:', selectedOption, 'for employee:', employeeAddress);
      setContributionAmount('');
      setEmployeeAddress('');
      setSelectedOption('');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const setEmployeeEmployer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's set-employee-employer function
      console.log('Setting employer for employee:', employeeAddress);
      setEmployeeAddress('');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!employerStatus) {
    return (
      <div className="dashboard employer-dashboard">
        <h2>Employer Dashboard</h2>
        <p>You are not registered as an employer. Please contact the admin to register.</p>
      </div>
    );
  }

  return (
    <div className="dashboard employer-dashboard">
      <h2>Employer Dashboard</h2>
      <form onSubmit={contribute} className="contribution-form">
        <h3>Contribute for Employee</h3>
        <div className="form-group">
          <label htmlFor="employeeAddress">Employee Address</label>
          <input
            type="text"
            id="employeeAddress"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contributionAmount">Amount</label>
          <input
            type="number"
            id="contributionAmount"
            value={contributionAmount}
            onChange={(e) => setContributionAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="investmentOption">Investment Option</label>
          <InvestmentOptions
            id="investmentOption"
            onSelect={(value) => setSelectedOption(value)}
            value={selectedOption}
          />
        </div>
        <button type="submit">Contribute</button>
      </form>
      <form onSubmit={setEmployeeEmployer} className="set-employee-form">
        <h3>Set Employee's Employer</h3>
        <div className="form-group">
          <label htmlFor="employeeAddressSet">Employee Address</label>
          <input
            type="text"
            id="employeeAddressSet"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Employer</button>
      </form>
    </div>
  );
};

export default EmployerDashboard;