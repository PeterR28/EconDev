import { useEffect, useState } from "react";
import "./dashboard.css"; // assumes you have modal styles in here or will add some

export default function CoffeeCard() {
  const [coffeePrice, setCoffeePrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://18.189.192.74:5000/api/coffee/price")
      .then((res) => res.json())
      .then((data) => {
        setCoffeePrice(data.average_coffee_price_usd_per_pound);
      })
      .catch((err) => {
        console.error("Error fetching coffee price:", err);
      });

    fetch("http://18.189.192.74:5000/api/coffee/changeInPrice")
      .then((res) => res.json())
      .then((data) => {
        setPriceChange(data.price_change_usd_per_pound);
      })
      .catch((err) => {
        console.error("Error fetching price change:", err);
      });
  }, []);

  const renderFooter = () => {
    if (priceChange === null) {
      return "Loading...";
    }

    const direction = priceChange >= 0 ? "up" : "down";
    const color = priceChange >= 0 ? "green" : "red";
    const absChange = Math.abs(priceChange).toFixed(2);

    return (
      <span style={{ color }}>
        {direction} ${absChange} from last week
      </span>
    );
  };

  return (
    <>
      <div
        className="card"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer" }}
      >
        <div className="card-title">Average Coffee Price Per Pound</div>
        <div className="card-price">
          {coffeePrice !== null ? `$${coffeePrice.toFixed(2)}` : "Loading..."}
        </div>
        <div className="card-footer">{renderFooter()}</div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginTop: 0 }}>Coffee Price Trends</h2>
            <div className="embed-container">
              <iframe
                src="https://fred.stlouisfed.org/graph/graph-landing.php?g=1EA3J&width=670&height=475"
                scrolling="yes"
                frameBorder="0"
                style={{ overflow: "hidden", width: "100%", height: "450px" }}
                //allowTransparency="true"
                loading="lazy"
                title="Coffee Price Chart"
              ></iframe>
            </div>
            <p style={{ marginTop: "1rem" }}>
              Placeholder text: Here you can add your own commentary or analysis
              on the coffee price trend data.
            </p>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
