import React from "react";
import "./style.scss";

const Index = () => {
  return (
    <div className="offers-img-container">
      <h3 className="text-center offer-title">Personalized Pet Tags</h3>
      <img
        className="offers-img"
        src="./images/pet-tag-elsa.png"
        alt="pet tag"
      />
      <h4 className="text-center percentage-off">20% OFF</h4>
      <p className="text-center promo-code">Use Code: 2020AMAZING</p>
      <p className="sponsored">Sponsored</p>
    </div>
  );
};

export default Index;
