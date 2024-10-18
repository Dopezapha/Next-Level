import React, { useState, useEffect } from 'react';
import InvestmentOptions from './InvestmentOptions';

const UserDashboard = ({ setLoading, handleError }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [balance, setBalance] = useState({ TOTAL_AMOUNT: 0, VESTED_AMOUNT: 0 });
  const [birthYear, setBirthYear] = useState('');
  const [contributionAmount, setContributionAmount] = useState('');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      // Implement the logic to fetch user profile from the smart contract
      // For now, we'll use dummy data
      const dummyProfile = { REGISTRATION_BLOCK: 12345, BIRTH_YEAR: 1990, EMPLOYER_ADDRESS: '0x1234...' };
      setUserProfile(dummyProfile);
      await fetchBalance();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBalance = async () => {
    try {
      // Implement the logic to fetch balance from the smart contract
      // For now, we'll use dummy data
      setBalance({ TOTAL_AMOUNT: 10000, VESTED_AMOUNT: 8000 });
    } catch (error) {
      handleError(error);
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's register-user function
      console.log('Registering user with birth year:', birthYear);
      await fetchUserProfile();
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
      // Implement the logic to call the smart contract's user-contribute function
      console.log('Contributing amount:', contributionAmount, 'to option:', selectedOption);
      await fetchBalance();
      setContributionAmount('');
      setSelectedOption('');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Implement the logic to call the smart contract's user-withdraw function
      console.log('Withdrawing amount:', withdrawalAmount, 'from option:', selectedOption);
      await fetchBalance();
      setWithdrawalAmount('');
      setSelectedOption('');
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard user-dashboard">
      <h2>User Dashboard</h2>
      {!userProfile ? (
        <form onSubmit={registerUser} className="registration-form">
          <h3>Register</h3>
          <div className="form-group">
            <label htmlFor="birthYear">Birth Year</label>
            <input
              type="number"
              id="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      ) : (
        <>
          <div className="user-info">
            <h3>User Information</h3>
            <p>Registration Block: {userProfile.REGISTRATION_BLOCK}</p>
            <p>Birth Year: {userProfile.BIRTH_YEAR}</p>
            <p>Employer: {userProfile.EMPLOYER_ADDRESS || 'Not set'}</p>
          </div>
          <div className="balance-info">
            <h3>Balance</h3>
            <p>Total Amount: {balance.TOTAL_AMOUNT}</p>
            <p>Vested Amount: {balance.VESTED_AMOUNT}</p>
          </div>
          <div className="actions">
            <h3>Actions</h3>
            <form onSubmit={contribute}>
              <h4>Contribute</h4>
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
                <label htmlFor="contributionOption">Investment Option</label>
                <InvestmentOptions
                  id="contributionOption"
                  onSelect={(value) => setSelectedOption(value)}
                  value={selectedOption}
                />
              </div>
              <button type="submit">Contribute</button>
            </form>
            <form onSubmit={withdraw}>
              <h4>Withdraw</h4>
              <div className="form-group">
                <label htmlFor="withdrawalAmount">Amount</label>
                <input
                  type="number"
                  id="withdrawalAmount"
                  value={withdrawalAmount}
                  onChange={(e) => setWithdrawalAmount(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="withdrawalOption">Investment Option</label>
                <InvestmentOptions
                  id="withdrawalOption"
                  onSelect={(value) => setSelectedOption(value)}
                  value={selectedOption}
                />
              </div>
              <button type="submit">Withdraw</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
