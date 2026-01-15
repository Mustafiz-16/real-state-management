import React from 'react';
import './contactform.css';

export default function ContactForm() {
  return (
    <section className="contact-form-container">
      <form className="contact-form">
        <input type="text" className="contact-input" placeholder="Your name" />
        <input type="email" className="contact-input" placeholder="Email address" />
        <textarea className="contact-textarea" rows={4} placeholder="How can we help?" />
        <button type="submit" className="contact-button">Submit</button>
      </form>
    </section>
  );
}

