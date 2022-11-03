import { pages } from './pages/pages';
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
          {pages.map((page, index)=>
            <Route key={index} path={page.link} element={
            <Page {...page} index={index} >{page.element}</Page>} />)
          }
      </Routes>

    </div>
  );
}

export default App;
