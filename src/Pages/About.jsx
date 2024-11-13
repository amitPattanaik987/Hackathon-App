import React from 'react'
import { useNavigate } from 'react-router-dom';


function About() {

    const navigate = useNavigate();

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white h-auto py-16 flex flex-col gap-12">
            <div className="flex flex-col gap-6 text-center">
                <h1 className="text-4xl font-bold text-white">About the Hackathon App</h1>
                <p className="w-[80%] mx-auto text-xl text-gray-200">
                    Welcome to the Hackathon App, your all-in-one platform to create, manage, and participate in exciting hackathons!
                    Whether you are a student, a professional, or just someone who loves to solve problems, this app offers a seamless experience for all.
                </p>
            </div>

            <div className="w-[80%] mx-auto">
                <h2 className="text-2xl font-semibold text-center text-blue-100 mb-4">-: Key Features :-</h2>
                <ul className="flex flex-col gap-6 text-lg list-disc text-gray-100">
                    <li>
                        <strong className="text-blue-300">Create and Manage Hackathons:</strong> Organizers can easily set up new hackathons by specifying details like the challenge name, description, dates, and participation rules. The app provides a smooth interface to manage participants, track submissions, and communicate with teams.
                    </li>

                    <li>
                        <strong className="text-blue-300">Participate in Hackathons:</strong> As a participant, you can browse through various live and upcoming hackathons, register for them, and collaborate with team members. Track your progress and submit your projects directly through the platform.
                    </li>

                    <li>
                        <strong className="text-blue-300">Countdown Timers and Notifications:</strong> Stay informed with real-time countdown timers that keep you updated on when hackathons start and finish. You'll never miss a deadline again!
                    </li>

                    <li>
                        <strong className="text-blue-300">Real-Time Collaboration and Networking:</strong> Our platform helps foster innovation by connecting participants and mentors. You can team up with others, ask for guidance, and share knowledge through our integrated communication tools.
                    </li>

                    <li>
                        <strong className="text-blue-300">Simple and Intuitive UI:</strong> With a user-friendly interface and modern design, navigating through the app is smooth and easy. Whether you’re new to hackathons or a seasoned participant, you’ll find everything you need without the hassle.
                    </li>
                </ul>
            </div>

            <div className="text-lg flex flex-col w-[80%] mx-auto gap-8">
                <h2 className="text-3xl font-semibold text-center text-blue-100">Why Use This App?</h2>
                <p className="text-center text-gray-200">
                    <strong className="text-blue-300">For Organizers:</strong> Streamline your event management with simple tools to monitor registrations, check submissions, and engage participants throughout the event lifecycle.
                </p>
                <p className="text-center text-gray-200">
                    <strong className="text-blue-300">For Participants:</strong> Access multiple hackathons in one place, track your projects, collaborate with others, and showcase your skills. Whether it's coding, design, or problem-solving, this platform empowers you to innovate and succeed.
                </p>
            </div>

            <div className="flex justify-center mt-8">
                <button className="bg-gradient-to-r from-green-400 to-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gradient-to-l hover:from-yellow-500 hover:to-green-400 transition duration-300" onClick={()=>navigate("/home")}>
                    Join Us Now!
                </button>
            </div>
        </div>
    );
}

export default About;
