import logo from './logo.svg';
import './App.css';

function App() {
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

      <div style={{ "display": "none" }} className="content">
        <div className="choice-button">
          <img className="choice-image" src="icons8-touchscreen-64.png"></img>
          <p className="choice-text">
            Ekran dotykowy pozwala wybierać elementy na ekranie naciskając na nie palcem, niestety ekran łatwo jest ubrudzić.
          </p>
        </div>
        <p className="skip-button">
          Pomiń
        </p>
      </div>


      <table className="comparison-table">
        <tbody>
          <tr>
            <th>
              <img src="laptop.png" />
              Lenovo L</th>
            <th>
              <img src="laptop.png" />HP Ultra Light</th>
          </tr>
          <tr>
            <td>CPU<br />Pentium 2 Core</td>
            <td>CPU<br />Pentium 4 Core</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default App;
