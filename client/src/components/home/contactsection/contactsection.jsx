import React, { useState } from 'react';
import { FiMail, FiMessageCircle, FiHelpCircle } from 'react-icons/fi';
import './contactsection.css';

export default function ContactSection() {


  return (
    <section className="contactsection">
      <h2>
        Do You Have Any Questions?<br />
        Get Help From Us
      </h2>
      <div className="contactsection_links">
        <span>
          <FiMessageCircle className="icon" />
          Chat live with our support team
        </span>
        <span>
          <FiHelpCircle className="icon" />
          Browse our FAQ
        </span>
      </div>
      <div className="contactsection_form">
        <div className="contactsection_input_wrapper">
          <FiMail className="input-icon" />
          <input
            type="email"
            placeholder="Enter your email address"
          />
        </div>
        <button type="button">Submit</button>
      </div>
    </section>
  );
}
