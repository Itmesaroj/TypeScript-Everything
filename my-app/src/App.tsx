
import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import Transaction from './components/Transaction';
import TransAdd from './components/TransAdd';
import TransHistory from './components/TransHistory';
import { GlobalProvider } from './Context/Global';

function App() {
  return (
   <div > 
   <Header/>
<GlobalProvider>
   <Balance/>
   <Transaction/>
   <TransHistory/>
   <TransAdd/>
</GlobalProvider>

   </div>
  );
}

export default App;
