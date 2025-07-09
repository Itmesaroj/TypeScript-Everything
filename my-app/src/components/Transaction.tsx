import React, { useContext } from "react";
import { GlobalContext } from "../Context/Global";

const Transaction: React.FC = () => {
  const { transactions } = useContext(GlobalContext);

  // ✅ Calculate income and expense
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="transaction__container">
      <div className="income">
        <p>INCOME</p>
        <p>₹{income.toFixed(2)}</p>
      </div>
      <div className="expense">
        <p>EXPENSE</p>
        <p>₹{Math.abs(expense).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Transaction;
