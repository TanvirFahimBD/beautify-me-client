import React from 'react';
import SendMessage from '../shared/SendMessage/SendMessage';

const ContactUs = () => {
    return (
        <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.13673771221!2d90.41928169999998!3d23.780636450000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1670146417414!5m2!1sen!2sbd" width="100%" height={400} frameborder="0" style={{ border: 0 }} allowfullscreen></iframe>
            <div className='my-5'>
                <SendMessage />
            </div>
        </div>
    );
};

export default ContactUs;