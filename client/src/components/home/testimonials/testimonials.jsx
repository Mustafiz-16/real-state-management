import React from 'react';
import TestimonialCard from '../../common/testimonialcard/testimonialcard';
import './testimonials.css';
import avatar1 from '../../../assets/WhatsApp Image 2025-11-09 at 20.02.09_13a8bb56.jpg';
import avatar2 from '../../../assets/luxury_and_rich_home_exterior_side_view.png';
import avatar3 from '../../../assets/luxury_and_rich_home_exterior_side_view.png';


const dummyTestimonials = [
  {
    id: 1,
    name: "prome",
    location: "Ashoktala",
    rating: 4.8,
    image: avatar1,
    review: "Dwello made finding my dream home so easy!"
  },
  {
    id: 2,
    name: "Fizz",
    location: "Kandirpur",
    rating: 4.7,
    image: avatar2,
    review: "Amazing service and very responsive team."
  },
  {
    id: 3,
    name: "Rifat",
    location: "shashongacha",
    rating: 4.9,
    image: avatar3,
    review: "Highly recommend Dwello to everyone looking for a house."
  }
];


export default function Testimonials() {
  return (
    <section className="testimonials">
      <h2 className="testimonials_title">What People Say About Dwello</h2>
      <div className="testimonials_cards">
        {dummyTestimonials.map(testimonial => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </section>
  );
}
