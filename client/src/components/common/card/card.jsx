import React from 'react';
import './card.css';


export default function Card({ children, className = '', onClick }) {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

Card.Header = ({ children }) => <div className="cardheader">{children}</div>;

Card.Body = ({ children }) => <div className="cardbody">{children}</div>;

Card.Footer = ({ children }) => <div className="cardfooter">{children}</div>;

Card.Image = ({ src, alt }) => (
  <div className="cardimage">
    <img src={src} alt={alt} />
  </div>
);


