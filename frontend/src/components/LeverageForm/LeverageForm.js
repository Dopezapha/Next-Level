import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './LeverageForm.module.css';

function LeverageForm() {
  const [btcAmount, setBtcAmount] = useState('');
  const [leverage, setLeverage] = useState('');
  const { openLeveragedPosition, closeLeveragedPosition, isLoading } = useContext(Web3Context);

  const handleOpenPosition = async (e) => {
    e.preventDefault();
    if (!validateInputs(btcAmount, leverage)) return;
    try {
      await openLeveragedPosition(btcAmount, leverage);
      resetForm();
    } catch (error) {
      handleError('Open leveraged position error', error);
    }
  };

  const handleClosePosition = async (e) => {
    e.preventDefault();
    try {
      await closeLeveragedPosition();
    } catch (error) {
      handleError('Close leveraged position error', error);
    }
  };

  // CHANGE: Added validation function
  const validateInputs = (btc, lev) => {
    if (!btc || isNaN(btc) || parseFloat(btc) <= 0) {
      alert('Please enter a valid positive BTC amount');
      return false;
    }
    if (!lev || isNaN(lev) || parseFloat(lev) < 1 || parseFloat(lev) > 100) {
      alert('Please enter a valid leverage value between 1 and 100');
      return false;
    }
    return true;
  };

  // CHANGE: Added error handling function
  const handleError = (message, error) => {
    console.error(`${message}:`, error);
    alert(`An error occurred: ${error.message || 'Unknown error'}`);
  };

  // CHANGE: Added form reset function
  const resetForm = () => {
    setBtcAmount('');
    setLeverage('');
  };

  return (
    <div className={styles.leverageForm}>
      <h2>Leveraged Trading</h2>
      <form>
        <input
          type="number"
          value={btcAmount}
          onChange={(e) => setBtcAmount(e.target.value)}
          placeholder="BTC Amount"
          step="0.00000001"
          min="0"
          disabled={isLoading}
        />
        <input
          type="number"
          value={leverage}
          onChange={(e) => setLeverage(e.target.value)}
          placeholder="Leverage (1-100)"
          step="1"
          min="1"
          max="100"
          disabled={isLoading}
        />
        <button onClick={handleOpenPosition} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Open Position'}
        </button>
        <button onClick={handleClosePosition} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Close Position'}
        </button>
      </form>
    </div>
  );
}

export default LeverageForm;
