import React, { useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './AccountInfo.module.css';

function AccountInfo() {
  const { account, btcStake, liquidity, leveragedPosition } = useContext(Web3Context);

  return (
    <div className={styles.accountInfo}>
      <h2>Account Information</h2>
      <p>Address: {account || 'Not connected'}</p>
      <p>BTC Stake: {btcStake !== null ? `${btcStake} BTC` : 'Loading...'}</p>
      <p>BTC Liquidity: {liquidity ? `${liquidity.btc} BTC` : 'Loading...'}</p>
      <p>USD Liquidity: {liquidity ? `${liquidity.usd} USD` : 'Loading...'}</p>
      {leveragedPosition && (
        <div>
          <h3>Leveraged Position</h3>
          <p>BTC Amount: {leveragedPosition.btcAmount} BTC</p>
          <p>Leverage: {leveragedPosition.leverage}x</p>
        </div>
      )}
    </div>
  );
}

export default AccountInfo;
