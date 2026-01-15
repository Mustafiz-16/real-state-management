// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";

// function ServicesPage() {
//     return (
//         <div>
//             <Navbar />

//             {/* Main Content: Wider max-width (7xl) and darker background for contrast */}
//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">

//                 {/* Header Section: Centered text with emphasis */}
//                 <section className="text-center max-w-4xl mx-auto">
//                     <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
//                         One Platform. <span className="text-yellow-600">Four User Experiences.</span>
//                     </h1>
//                     <p className="text-lg text-gray-600">
//                         Dwello connects buyers, owners, agents, and admins on a single, secure real estate platform, tailored to your unique role.
//                     </p>
//                 </section>

//                 {/* Service Cards Grid Section: Staggered 2-column layout on desktop */}
//                 <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">

//                     {/* Card 1: Buyers - Full width on mobile/tablet, 1/4 on XL desktop */}
//                     <div className="bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl p-8 transform hover:scale-[1.02] transition duration-300 xl:col-span-1">
//                         {/* Placeholder for an icon (e.g., Home Icon) */}
//                         <div className="mb-4 text-4xl text-yellow-500">🏠</div>
//                         <h2 className="text-xl font-bold mb-3 text-gray-900">For Buyers</h2>
//                         <p className="text-gray-700">
//                             Browse verified properties, filter by location and price, request visits, and chat with owners or agents. **The perfect home search starts here.**
//                         </p>
//                     </div>

//                     {/* Card 2: Owners */}
//                     <div className="bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl p-8 transform hover:scale-[1.02] transition duration-300 xl:col-span-1">
//                         <div className="mb-4 text-4xl text-yellow-500">🔑</div>
//                         <h2 className="text-xl font-bold mb-3 text-gray-900">For Owners</h2>
//                         <p className="text-gray-700">
//                             Create premium listings, upload documents, manage booking requests, and track interest in your properties. **Control your assets easily.**
//                         </p>
//                     </div>

//                     {/* Card 3: Agents */}
//                     <div className="bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl p-8 transform hover:scale-[1.02] transition duration-300 xl:col-span-1">
//                         <div className="mb-4 text-4xl text-yellow-500">🤝</div>
//                         <h2 className="text-xl font-bold mb-3 text-gray-900">For Agents</h2>
//                         <p className="text-gray-700">
//                             Manage multiple properties and clients from one dashboard, with real-time inquiries and updates. **Efficiency powered by data.**
//                         </p>
//                     </div>

//                     {/* Card 4: Admins */}
//                     <div className="bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl p-8 transform hover:scale-[1.02] transition duration-300 xl:col-span-1">
//                         <div className="mb-4 text-4xl text-yellow-500">⚙️</div>
//                         <h2 className="text-xl font-bold mb-3 text-gray-900">For Admins</h2>
//                         <p className="text-gray-700">
//                             Approve listings, verify users, and monitor platform activity using advanced admin tools and analytics. **Keep the platform running smoothly.**
//                         </p>
//                     </div>

//                 </section>
//             </main>

//             <Footer />
//         </div>
//     );
// }

// export default ServicesPage;

// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";
// import { Home, Key, Handshake, Settings } from "lucide-react";
// import ServiceCard from "../components/services/servicecard/servicecard";
// import ServicesHeader from "../components/services/serviceheader/serviceheader";

// function ServicesPage() {
//     return (
//         <div>
//             <Navbar />

//             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-16">

//                 {/* Header */}
//                 <ServicesHeader />

//                 {/* Cards */}
//                 <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">

//                     <ServiceCard
//                         icon={<Home className="w-10 h-10 text-yellow-500" />}
//                         title="For Buyers"
//                         text="Browse verified properties..."
//                     />

//                     <ServiceCard
//                         icon={<Key className="w-10 h-10 text-yellow-500" />}
//                         title="For Owners"
//                         text="Create premium listings..."
//                     />

//                     <ServiceCard
//                         icon={<Handshake className="w-10 h-10 text-yellow-500" />}
//                         title="For Agents"
//                         text="Manage multiple properties..."
//                     />

//                     <ServiceCard
//                         icon={<Settings className="w-10 h-10 text-yellow-500" />}
//                         title="For Admins"
//                         text="Approve listings and verify users..."
//                     />


//                 </section>
//             </main>

//             <Footer />
//         </div>
//     );
// }

// export default ServicesPage;
// import Navbar from "../components/layout/navbar/navbar";
// import Footer from "../components/layout/footer/footer";
// import { Home, Key, Handshake, Settings } from "lucide-react";
// import ServiceCard from "../components/services/servicecard/servicecard";
// import ServicesHeader from "../components/services/serviceheader/serviceheader";

// function ServicesPage() {
//     return (
//         <div>
//             <Navbar />

//             <main className="services-main">
//                 {/* Header */}
//                 <ServicesHeader />

//                 {/* Cards */}
//                 <section className="services-cards">
//                     <ServiceCard
//                         icon={<Home className="service-icon" />}
//                         title="For Buyers"
//                         text="Browse verified properties..."
//                     />

//                     <ServiceCard
//                         icon={<Key className="service-icon" />}
//                         title="For Owners"
//                         text="Create premium listings..."
//                     />

//                     <ServiceCard
//                         icon={<Handshake className="service-icon" />}
//                         title="For Agents"
//                         text="Manage multiple properties..."
//                     />

//                     <ServiceCard
//                         icon={<Settings className="service-icon" />}
//                         title="For Admins"
//                         text="Approve listings and verify users..."
//                     />
//                 </section>
//             </main>

//             <Footer />
//         </div>
//     );
// }

// export default ServicesPage;
import Navbar from "../components/layout/navbar/navbar";
import Footer from "../components/layout/footer/footer";
import ServicesHeader from "../components/services/serviceheader/serviceheader";
import Service from "../components/services/servicepage/service";

function ServicesPage() {
    return (
        <div>
            <Navbar />
            <ServicesHeader />
            <Service />
            <Footer />
        </div>
    );
}

export default ServicesPage;
