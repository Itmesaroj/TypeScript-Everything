import { Transaction } from "./Global"; // make sure filename matches

export interface State {
  transactions: Transaction[];
}

export type Action =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: number }

const AppReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default AppReducer;
