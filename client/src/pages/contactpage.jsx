// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";

// function ContactPage() {
//   return (
//     <div>
//       <Navbar />

//       <main className="max-w-4xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
//         <section>
//           <h1 className="text-3xl font-bold mb-4">Get in touch</h1>
//           <p className="text-gray-600 mb-4">
//             Have questions about a property or need help with your account? Reach out to the Dwello team.
//           </p>
//           <p className="text-sm text-gray-700">Email: support@dwello.com</p>
//           <p className="text-sm text-gray-700">Phone: +880 1XXX XXX XXX</p>
//         </section>

//         <section className="bg-white shadow-sm rounded-xl p-6">
//           <form className="space-y-4">
//             <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Your name" />
//             <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Email address" />
//             <textarea
//               className="w-full border rounded px-3 py-2 text-sm"
//               rows={4}
//               placeholder="How can we help?"
//             />
//             <button className="w-full bg-brown-600 text-white rounded py-2 text-sm">
//               Submit
//             </button>
//           </form>
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default ContactPage;


import React from 'react';
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import Contacts from '../components/contact/contacts/contacts';

function ContactPage() {
  return (
    <div>
      <Navbar />
      <Contacts />

      <Footer />
    </div>
  );
}

export default ContactPage;
