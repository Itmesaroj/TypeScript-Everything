import { useContext, useState } from "react";
import { GlobalContext, Transaction } from "../Context/Global";

const TransAdd: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [amount, setAmount] = useState<number | undefined>();

  const { addTransaction } = useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (text && amount !== undefined) {
      const newTransaction: Transaction = {
        id: Date.now(), // use numeric ID instead of string
        text,
        amount,
      };
      addTransaction(newTransaction);
      setText("");        // clear form
      setAmount(undefined);
    }
  };

  return (
    <div className="Add__transtion__container">
      <h3>Add new transaction</h3>

      <form onSubmit={handleSubmit}>
        <p>Text</p>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <p>Amount</p>
        <p>(negative - expense, positive - income)</p>
        <input
          type="number"
          placeholder="Enter amount..."
          value={amount ?? ""}
          onChange={(e) => setAmount(Number(e.target.value))}
        />

        <button type="submit" id="button">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransAdd;
