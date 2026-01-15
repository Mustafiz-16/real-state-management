import Navbar from '../components/layout/navbar/navbar';
import HeroSection from '../components/home/herosection/herosection';
import WhyChooseUs from '../components/home/whychooseus/whychooseus';
import PopularResidences from '../components/home/popularresidences/popularresidences';
import Testimonials from '../components/home/testimonials/testimonials';
import Footer from '../components/layout/footer/footer';
import StatsSection from '../components/home/statssection/statssection';
import ContactSection from '../components/home/contactsection/contactsection';


function HomePage() {

    return (
        <div>
            {/* <Navbar />
            <HeroSection />
            <StatsSection />
            <WhyChooseUs />
            <PopularResidences />
            <Testimonials />
            <ContactSection />
            <Footer /> */}

            <Navbar />
            <HeroSection />
            <StatsSection />
            <WhyChooseUs />
            <PopularResidences />
            <Testimonials />
            <ContactSection />
            <Footer />
            
        </div>
    );
}

export default HomePage;



