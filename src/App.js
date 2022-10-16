import Comparison from './pages/Comparison';
import Selection from './pages/Selection';
import NotFound from './pages/NotFound';
import { forms } from './pages/forms/forms';

import Starred from './components/Starred';
import Page from './pages/Page';

import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1 className="app-title">
        Twój nowy
        <img className="app-title-icon" src="laptop.png" alt="laptop"></img>
        <Starred />
      </h1>
      

      <Routes>
          {forms.map(({id, description, element})=>
            <Route path={id} element={<Page description={description}>{element}</Page>} />)
          }
          <Route path="select" 
            element={<Page description="Wybierz do porównania"><Selection /></Page>} />
          <Route path="comparison" element={<Page description="Porównanie"><Comparison /></Page>} />
          <Route path="*" element={<Page description="404"><NotFound /></Page>} />
      </Routes>

    </div>
  );
}

export default App;
