// function ServiceCard({ icon, title, text }) {
//     return (
//         <div className="bg-white border-t-4 border-yellow-500 shadow-xl rounded-xl p-8 transform hover:scale-[1.02] transition duration-300">
//             <div className="mb-4 text-4xl text-yellow-500">{icon}</div>
//             <h2 className="text-xl font-bold mb-3 text-gray-900">{title}</h2>
//             <p className="text-gray-700">{text}</p>
//         </div>
//     );
// }

// export default ServiceCard;
import './servicecard.css';

function ServiceCard({ icon, title, text }) {
    return (
        <div className="service-card">
            <div className="service-card-icon">{icon}</div>
            <h2 className="service-card-title">{title}</h2>
            <p className="service-card-text">{text}</p>
        </div>
    );
}

export default ServiceCard;
