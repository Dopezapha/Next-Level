import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './LiquidityForm.module.css';

function LiquidityForm() {
  const [btcAmount, setBtcAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const { addLiquidity, removeLiquidity, isLoading } = useContext(Web3Context);

  const handleAddLiquidity = async (e) => {
    e.preventDefault();
    if (!validateAmounts(btcAmount, usdAmount)) return;
    try {
      await addLiquidity(btcAmount, usdAmount);
      resetForm();
    } catch (error) {
      handleError('Add liquidity error', error);
    }
  };

  const handleRemoveLiquidity = async (e) => {
    e.preventDefault();
    if (!validateAmounts(btcAmount, usdAmount)) return;
    try {
      await removeLiquidity(btcAmount, usdAmount);
      resetForm();
    } catch (error) {
      handleError('Remove liquidity error', error);
    }
  };

  // CHANGE: Added validation function
  const validateAmounts = (btc, usd) => {
    if (!btc || !usd || isNaN(btc) || isNaN(usd) || parseFloat(btc) <= 0 || parseFloat(usd) <= 0) {
      alert('Please enter valid positive amounts for both BTC and USD');
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
    setUsdAmount('');
  };

  return (
    <div className={styles.liquidityForm}>
      <h2>Manage Liquidity</h2>
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
          value={usdAmount}
          onChange={(e) => setUsdAmount(e.target.value)}
          placeholder="USD Amount"
          step="0.01"
          min="0"
          disabled={isLoading}
        />
        <button onClick={handleAddLiquidity} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Add Liquidity'}
        </button>
        <button onClick={handleRemoveLiquidity} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Remove Liquidity'}
        </button>
      </form>
    </div>
  );
}

export default LiquidityForm;
