// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const navItems = ["home", "settings", "build", "cloud", "mail"];
export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="page sidebar-3-page">
      <aside className={`sidebar-3 ${isOpen ? "open" : ""}`}>
        <div className="inner">
          <header>
            <button
              type="button"
              className="sidebar-3-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="material-symbols-outlined">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </header>
          <nav>
            {navItems.map((item) => (
              <button key={item} type="button">
                <span className="material-symbols-outlined">{item}</span>
                <p>{item}</p>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </section>
  );
}
