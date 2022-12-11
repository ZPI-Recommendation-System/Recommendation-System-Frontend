import { pages } from './pages/pages';
import { Link } from "react-router-dom";

import StarredLink from './components/StarredLink';
import Page from './pages/Page';

import './App.css';
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import Dialog from './components/Dialog';
import Gallery from './components/Gallery';


function App() {
  const container = useRef(null);
  const [height, setHeight] = useState(0);
  const style = { height: height + "px" }

  useEffect(() => {
    if (container.current) {
      const containerCurrent = container.current;

      const resizeObserver = new ResizeObserver((entries) => {
        setHeight(containerCurrent.scrollHeight)
      })
      resizeObserver.observe(containerCurrent)

      return _ => resizeObserver.unobserve(containerCurrent)
    }
  })

  return (<>
    <Dialog />
    <Gallery />
    <div className="background">
    </div>
    <div className="app" style={style}>
      <div className="app-container" ref={container}>
        <Link className="app-title" to='/'>
          Twój nowy
          <img className="app-title-icon" src="/logo.png" alt="laptop"></img>
        </Link>
        <StarredLink />

        <Routes>
          {pages.map((page, index) =>
            <Route key={index} path={page.link} element={
              <Page {...page} index={index} >{page.element}</Page>} />)
          }
        </Routes>

      </div>
    </div></>
  );
}

export default App;
