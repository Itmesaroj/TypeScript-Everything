// GlobalContext.tsx
import { createContext, useReducer, ReactNode } from "react";
import AppReducer from "./AppReducer";

// ✅ Define the transaction (not "transition")
export interface Transaction {
  id: number;
  text: string;
  amount: number;
}

// ✅ Define State type (for useReducer)
interface State {
  transactions: Transaction[];
}

// ✅ Context structure
interface GlobalContextProps {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: number) => void;
}

// ✅ Initial state for useReducer
const initialState: State = {
  transactions: [],
};

// ✅ Create context with correct structure
export const GlobalContext = createContext<GlobalContextProps>({
  transactions: [],
  addTransaction: () => {},
  deleteTransaction: () => {},
});

// ✅ Global Provider
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // ✅ Action functions
  function addTransaction(transaction: Transaction) {
    dispatch({ type: "ADD_TRANSACTION", payload: transaction });
  }

  function deleteTransaction(id: number) {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }

  return (
    <GlobalContext.Provider value={{ transactions: state.transactions, addTransaction, deleteTransaction }}>
      {children}
    </GlobalContext.Provider>
  );
};
