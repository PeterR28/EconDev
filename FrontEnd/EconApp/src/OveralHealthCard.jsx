import "./dashboard.css";

export default function OverallHealthCard() {
  return (
    <div className="overall-card">
      <div className="overall-title">Overall US Economic Health</div>
      <div className="overall-metrics">
        <div className="metric-box">
          <div className="metric-label">GDP</div>
          <div className="metric-value">$23.1T</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Inflation</div>
          <div className="metric-value">3.4%</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Employment</div>
          <div className="metric-value">96%</div>
        </div>
        <div className="metric-box">
          <div className="metric-label">Interest Rate</div>
          <div className="metric-value">5.25%</div>
        </div>
      </div>
    </div>
  );
}
