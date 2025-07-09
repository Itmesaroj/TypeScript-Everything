import React, { useContext } from "react";
import { GlobalContext } from "../Context/Global";

const TransHistory: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <div className="transHistory__container">
        <h4>History</h4>

        {transactions.length === 0 && <p>No transactions yet.</p>}

        {transactions.map((txn) => (
          <div key={txn.id} className="cards">
            <p>{txn.text}</p>
            <p>{txn.amount > 0 ? `+₹${txn.amount}` : `-₹${Math.abs(txn.amount)}`}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TransHistory;
