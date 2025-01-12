import React from 'react'
import "./Banner1.css"
import 'bootstrap/dist/css/bootstrap.css';
import rocket from "../../assets/Rocket-img.png"
import { useNavigate } from 'react-router-dom';

export default function Banner1() {
    const navigate = useNavigate();

    const CreateChallenge = () => {
        const login = localStorage.getItem("token");
        if (login) {
            const newemail = localStorage.getItem("email");

            fetch("http://localhost:3000/checkprime", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ email: newemail })
            }).then(response => response.json())
                .then(data => {
                    if (data.status) {
                        navigate("/admin");
                    }
                    else {
                        alert("Only Prime Members Allowed");
                    }
                })
                .catch(error => console.error('Error:', error));
        }
        else{
            alert("SIGN IN TO CREATE ANY HACKATHON ....")
        }
    }
    return (
        <div className='main'>
            <div className='left'>
                <div className='line'></div>
                <div className='left-second'>
                    <div className='left-text'>
                        <p className='text-1'>Accelerate Innovation <br />with Global AI Challenges</p>
                        <p className='text-2'>AI Challenges at Global Hackathon real-world problems. It is a <br /> great place to put your AI/Data Science skills to test on <br />diverse datasets allowing you to foster learning through <br /> competitions.</p>
                    </div>
                    <div>
                        <button className='btn btn-light' onClick={() => CreateChallenge()}>Create Challenge</button>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={rocket} alt="" />
            </div>
        </div>
    )
}
