import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Fib from './Fib';
import OtherPage from './Otherpage';

function App() {
  return (
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/otherpage">Other Page</Link>
        <div>
          <Routes>
            <Route path="/" element={<Fib />} />
            <Route path="/otherpage" element={<OtherPage />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
