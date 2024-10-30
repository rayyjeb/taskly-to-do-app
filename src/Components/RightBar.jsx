import React from "react";

const Sidebar = () => {
  return (
    <div className="spotify">
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/00iwBmrwegO2qFRcT3VWbs?utm_source=generator"
        width="100%"
        height="252"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
      <div className="illustrations">
        <img
          src="https://illustrations.popsy.co/green/app-launch.svg"
          alt="App launch illustration"
        />
      </div>
    </div>
  );
};

export default Sidebar;
