import React, { useState, useEffect } from "react";
import './Countdown_timer.css'; // Add this to use custom styling

const Countdown_timer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="timer-container">
            {timeLeft.days !== undefined ? (
                <div className="countdown-timer">
                    <div className="time-segment">
                        <span className="time">{timeLeft.days}</span>
                        <span className="label">Days</span>
                    </div>
                    <div className="time-segment">
                        <span className="time">{timeLeft.hours}</span>
                        <span className="label">Hours</span>
                    </div>
                    <div className="time-segment">
                        <span className="time">{timeLeft.minutes}</span>
                        <span className="label">Mins</span>
                    </div>
                    <div className="time-segment">
                        <span className="time">{timeLeft.seconds}</span>
                        <span className="label">Secs</span>
                    </div>
                </div>
            ) : (
                <span>Hackathon Ended</span>
            )}
        </div>
    );
};

export default Countdown_timer;
