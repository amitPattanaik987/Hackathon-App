import React, { useEffect, useState } from 'react';
import "./Participate.css";
import { useParams } from 'react-router-dom';

function Participate() {
    const [Hackathon_data, setHackathon_data] = useState();
    const path = useParams();
    const hackathon = path.hackathon_name;

    useEffect(() => {
        fetch("https://hackathon-app-2-wfdy.onrender.com/hackathon_details", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hackathon })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setHackathon_data(data.body[0]);
            });
    }, [hackathon]);

    useEffect(() => {
        console.log("Usestate data:")
        console.log(Hackathon_data);
    }, [Hackathon_data]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <div className='bg-slate-300'>
            {Hackathon_data && (
                <div className='mx-auto w-[80%] h-[80vh] bg-[#40154d] text-white text-center p-4 flex flex-col gap-[25px] overflow-y-auto'>
                    <h2 className='m-0'>Welcome to {hackathon}</h2>
                    <p>Thank You For Showing Your Interest In {hackathon}</p>
                    <p>We are thrilled to announce you that our Hackathon is Going To Occur in {Hackathon_data.city}, {Hackathon_data.state}.</p>
                    <p>Location : {Hackathon_data.location}</p>
                    <p>Date: {formatDate(Hackathon_data.startDate)}</p>
                    <p>Time: {Hackathon_data.time}</p>
                    <h1>All The Best</h1> 
                </div>
            )}
        </div>
    );
}
export default Participate;
