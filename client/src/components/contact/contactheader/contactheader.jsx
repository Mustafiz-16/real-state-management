import React from 'react';
import './contactheader.css';

export default function ContactHeader() {
  return (
    <section className="contact-header">
      <h1 className="contact-title">Get in touch</h1>
      <p className="contact-description">
        Have questions about a property or need help with your account? Reach out to the Dwello team.
      </p>
      <p className="contact-info">Email: support@dwello.com</p>
      <p className="contact-info">Phone: +880 1XXX XXX XXX</p>
    </section>
  );
}