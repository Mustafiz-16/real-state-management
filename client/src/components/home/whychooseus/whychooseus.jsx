import React from 'react';
import FeatureCard from '../../../components/common/featurecard/featurecard';
import { FiUserCheck, FiFileText, FiHeadphones } from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';

import './whychooseus.css';

export default function WhyChooseUs() {
    const features = [
        {
            icon: <FiUserCheck size={28} color="#ff6b36" />,
            title: 'Personalized Service',
            description: 'Our services adapt to your unique needs, making your journey stress-free.',
            bgColor: '#f9ece2'
        },
        {
            icon: <FiFileText size={28} color="#ff6b36" />,
            title: 'Transparent Process',
            description: 'Stay informed with our clear and honest approach to buying your home.',
            bgColor: '#f3e7e3'
        },
        // {
        //     icon: <FaHandshake size={28} color="#ff6b36"/>,
        //     title: "Trusted Deals",
        //     description: "We ensure safe and reliable transactions.",
        //     bgColor: '#e9dad8'
        // },
        {
            // icon: <FiHeadphones size={28} color="#ff6b36" />,
            icon: <FaHandshake size={28} color="#ff6b36" />,
            title: 'Exceptional Support',
            description: 'Providing peace of mind with our responsive and attentive customer service.',
            bgColor: '#e9dad8'
        }
    ];

    return (
        <section className="whychooseus">
            <h2>Why Choose Us</h2>
            <div className="whychooseus_cards">
                {features.map((item, idx) => (
                    <FeatureCard
                        key={item.title}
                        icon={item.icon}
                        title={item.title}
                        description={item.description}
                        bgColor={item.bgColor}
                    />
                ))}
            </div>
        </section>
    );
}
