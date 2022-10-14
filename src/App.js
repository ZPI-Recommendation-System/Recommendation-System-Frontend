import Comparison from './pages/Comparison';
import NotFound from './pages/NotFound';
import ScreenExtras from './pages/forms/ScreenExtras';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="app">
      <h1 className="app-title">
        Twój nowy
        <img className="app-title-icon" src="laptop.png"></img>

        <img src="icons8-star-32.png" className="favs-star"></img>
        <span className="favs-count">3</span>
      </h1>

      <div className="progress-bar">
        <p className="progress-bar-text">
          ...
          <span className="progress-bar-divider"></span>
          <span className="progress-bar-divider-space"></span>
          4
          <span className="progress-bar-divider"></span>
          <span className="progress-bar-divider-space"></span>
          5
          <span className="progress-bar-divider"></span>
          <span className="progress-bar-divider-space"></span>
          Do czego użyjesz laptopa?</p>
      </div>

      <Routes>
          <Route path="extras" element={<ScreenExtras />} />
          <Route path="comparison" element={<Comparison />} />
          <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
