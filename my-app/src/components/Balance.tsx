import React, { useContext } from 'react';
import { GlobalContext } from '../Context/Global';

const Balance: React.FC = () => {
  const {transactions}=useContext(GlobalContext);
  const balance=transactions.reduce((ac,t)=> ac+t.amount,0)
  return (
    <div className='balance__container'>
      <h4>YOUR BALANCE</h4>
      <h4 className='total__balance'>$ {balance}</h4>
    </div>
  );
};

export default Balance;
