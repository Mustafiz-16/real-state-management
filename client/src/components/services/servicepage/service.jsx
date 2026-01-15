import ServiceCard from "../servicecard/servicecard";
import { Home, Key, Handshake, Settings } from "lucide-react";
import './service.css';

export default function Service() {
    return (
        <div>
            <section className="services-cards-container">
                <ServiceCard icon={<Home className="service-icon" />} title="For Buyers" text="Browse verified properties..." />
                <ServiceCard icon={<Key className="service-icon" />} title="For Owners" text="Create premium listings..." />
                {/* <ServiceCard icon={<Handshake className="service-icon" />} title="For Agents" text="Manage multiple properties..." /> */}
                <ServiceCard icon={<Settings className="service-icon" />} title="For Admins" text="Approve listings and verify users..." />
            </section>
        </div>
    );
}


