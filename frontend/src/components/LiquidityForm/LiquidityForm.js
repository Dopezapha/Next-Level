import React, { useState, useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './LiquidityForm.module.css';

function LiquidityForm() {
  const [btcAmount, setBtcAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const { addLiquidity, removeLiquidity, isLoading } = useContext(Web3Context);

  const handleAddLiquidity = async (e) => {
    e.preventDefault();
    if (!btcAmount || !usdAmount || isNaN(btcAmount) || isNaN(usdAmount) || parseFloat(btcAmount) <= 0 || parseFloat(usdAmount) <= 0) {
      alert('Please enter valid amounts');
      return;
    }
    try {
      await addLiquidity(btcAmount, usdAmount);
      setBtcAmount('');
      setUsdAmount('');
    } catch (error) {
      console.error('Add liquidity error:', error);
      alert('An error occurred while adding liquidity. Please try again.');
    }
  };

  const handleRemoveLiquidity = async (e) => {
    e.preventDefault();
    if (!btcAmount || !usdAmount || isNaN(btcAmount) || isNaN(usdAmount) || parseFloat(btcAmount) <= 0 || parseFloat(usdAmount) <= 0) {
      alert('Please enter valid amounts');
      return;
    }
    try {
      await removeLiquidity(btcAmount, usdAmount);
      setBtcAmount('');
      setUsdAmount('');
    } catch (error) {
      console.error('Remove liquidity error:', error);
      alert('An error occurred while removing liquidity. Please try again.');
    }
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
