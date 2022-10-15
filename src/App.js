import Comparison from './pages/Comparison';
import NotFound from './pages/NotFound';
import ScreenExtras from './pages/forms/ScreenExtras';
import Disk from './pages/forms/Disk';

import Starred from './components/Starred';
import Bar from './components/Bar';

import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">
        Twój nowy
        <img className="app-title-icon" src="laptop.png"></img>
        <Starred />
      </h1>
      <Bar />

      <Routes>
          <Route path="disk" element={<Disk />} />
          <Route path="extras" element={<ScreenExtras />} />
          <Route path="comparison" element={<Comparison />} />
          <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
