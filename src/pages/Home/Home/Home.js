import React from 'react';
import Appointment from '../Appointment/Appointment';
import Banner from '../Banner/Banner';
import Info from '../Info/Info';
import OurServices from '../OurServices/OurServices';
import OurSolution from '../OurSolution/OurSolution';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <>
            <Banner />
            <OurServices />
            <Info />
            <OurSolution />
            <Appointment />
            <Testimonial />
        </>
    );
};

export default Home;