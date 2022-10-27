import Comparison from './pages/Comparison';
import Results from './pages/lists/Results';
import Favourites from './pages/lists/Favourites';
import Search from './pages/lists/Search';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import { forms } from './pages/forms/forms';
import { Link } from "react-router-dom";

import StarredLink from './components/StarredLink';
import Page from './pages/Page';

import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Link className="app-title" to='/'>
        Twój nowy
        <img className="app-title-icon" src="logo.png" alt="laptop"></img>
      </Link>
        <StarredLink />
      

      <Routes>
          {forms.map(({id, description, element}, index)=>
            <Route key={id} path={id} element={<Page id={id} index={index+1} description={description}>{element}</Page>} />)
          }
          <Route path="/" 
            element={<Page index={0} description="Strona początkowa"><Landing /></Page>} />
          <Route path="results" 
            element={<Page index={10} description="Wybierz do porównania"><Results /></Page>} />
          <Route path="favourites" 
            element={<Page index={10} description="Zapisane laptopy"><Favourites /></Page>} />
            <Route path="search" 
              element={<Page index={10} description="Wyszukaj laptop"><Search /></Page>} />
          <Route path="comparison" element={<Page index={11} description="Porównanie"><Comparison /></Page>} />
          <Route path="*" element={<Page index="?" description="404"><NotFound /></Page>} />
      </Routes>

    </div>
  );
}

export default App;
