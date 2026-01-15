import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer_main">
        <div className="footer_brand">
          <strong>Dwello</strong>
          <p>Bringing you closer to your dream home, one click at a time.</p>
        </div>
        <div className="footer_sections">
          <div>
            <h4>About</h4>
            <ul>
              <li>Our Story</li>
              <li>Careers</li>
              <li>Our Team</li>
              <li>Resources</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>FAQ</li>
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4>Find Us</h4>
            <ul>
              <li>Events</li>
              <li>Locations</li>
              <li>Newsletter</li>
            </ul>
          </div>
          <div>
            <h4>Our Social</h4>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        &copy; 2025 Dwello. All rights reserved.
      </div>
    </footer>
  );
}
