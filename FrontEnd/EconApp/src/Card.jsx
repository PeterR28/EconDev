import "./dashboard.css";
import PropTypes from "prop-types";
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  size: PropTypes.string, // optional (only used for the top card)
};
export default function Card({ title, description, change, size }) {
  return (
    <div className={`card ${size === "large" ? "card-large" : "card-small"}`}>
      <div className="card-top">
        <div className="card-title">{title}</div>
        <div className="card-viz">**</div>
      </div>
      <div className="card-middle">
        <div className="card-description">{description}</div>
      </div>
      <hr className="card-divider" />
      <div className="card-bottom">
        <div className="card-change">{change}</div>
      </div>
    </div>
  );
}
