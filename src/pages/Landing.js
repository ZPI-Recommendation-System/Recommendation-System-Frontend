function Landing() {
    return (<div className="content">
      <p className="text">
      Witaj w systemie rekomendacyjnym dla laptopów.
Wypełnij krótką ankietę aby uzyskać listę wybranych dla ciebie urządzeń.
      </p>
      <p className="skip-button" style={{textAlign: "left"}}    >
        Wypełnij ankietę
      </p>
      <hr />
      <p className="text" style={{width: "70%"}}>
      Możesz też wyszukać laptop po nazwie aby móc porównywać go do wybranych przez nas.
      </p>
      <p className="skip-button" style={{textAlign: "left"}}>
        Wyszukaj po nazwie
      </p>
    </div>);
}

export default Landing;
