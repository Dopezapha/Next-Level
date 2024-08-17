import React, { useContext } from 'react';
import { Web3Context } from '../../contexts/Web3Context';
import styles from './AccountInfo.module.css';

function AccountInfo() {
  const { account, stakedAmount } = useContext(Web3Context);

  return (
    <div className={styles.accountInfo}>
      <h2>Account Information</h2>
      <p>Address: {account || 'Not connected'}</p>
      <p>Staked Amount: {stakedAmount !== null ? `${stakedAmount} BTC` : 'Loading...'}</p>
    </div>
  );
}

export default AccountInfo;
