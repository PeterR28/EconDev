// src/components/Dashboard.jsx

import CoffeeCard from "./CoffeeCard.JSX";
import "./dashboard.css";
import OverallHealthCard from "./OveralHealthCard";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <OverallHealthCard />
      </div>
      <div className="dashboard-grid">
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
      </div>
    </div>
  );
}
