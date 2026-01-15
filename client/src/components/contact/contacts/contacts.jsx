import React from 'react';
import ContactHeader from '../contactheader/contactheader';
import ContactForm from '../contactform/contactform';

function Contacts() {
  return (
    <div>
      <main className="contact-page-main">
        <ContactHeader />
        <ContactForm />
      </main>
    </div>
  );
}

export default Contacts;
