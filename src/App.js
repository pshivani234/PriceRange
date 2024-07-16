import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Watchlist from './components/WatchList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/WatchList" element={<Watchlist/>}/>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
