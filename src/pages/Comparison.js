import './Comparison.css';

function Comparison() {
  return (
    <div className="content">
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

export default Comparison;
