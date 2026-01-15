// function ServicesHeader() {
//     return (
//         <section className="text-center max-w-4xl mx-auto">
//             <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
//                 One Platform. <span className="text-yellow-600">Four User Experiences.</span>
//             </h1>
//             <p className="text-lg text-gray-600">
//                 Dwello connects buyers, owners, agents, and admins on a single, secure real estate platform, tailored to your unique role.
//             </p>
//         </section>
//     );
// }

// export default ServicesHeader;
import './serviceheader.css';

function ServicesHeader() {
    return (
        <section className="services-header">
            <h1 className="services-header-title">
                One Platform. <span className="highlight">Multiple User Experiences.</span>
            </h1>
            <p className="services-header-text">
                Dwello connects buyers, owners, and admins on a single, secure real estate platform, tailored to your unique role.
            </p>
        </section>
    );
}

export default ServicesHeader;
