import React from 'react';
import { useNavigate } from 'react-router-dom';


const ContactUs = () => {

    const navigate = useNavigate();
    return (
        <div className="mx-auto p-5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            <h2 className="text-4xl font-bold text-center text-white mb-5">Contact Us</h2>
            <p className="text-center text-lg text-white mb-8">We'd love to hear from you. Here's how you can reach us:</p>

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">Contact Information</h3>

                <div className="mb-4">
                    <p className="font-medium text-xl text-blue-500">Phone:</p>
                    <p className="text-lg text-gray-700">+91 8260612979</p>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-xl text-blue-500">Email:</p>
                    <p className="text-lg text-gray-700">amitpattanaik987@gmail.com</p>
                </div>

                <div className="mb-4">
                    <p className="font-medium text-xl text-blue-500">Address:</p>
                    <p className="text-lg text-gray-700">123 Hackathon Street, Innovation City, 98765</p>
                </div>

                <div className="mt-6 text-center">
                    <button className="bg-gradient-to-r from-green-400 to-yellow-500 text-white py-2 px-6 rounded-full hover:bg-gradient-to-l hover:from-yellow-500 hover:to-green-400 transition duration-300" onClick={() =>navigate("/home")}>
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
