import React from 'react'
import "./Challenges.css"
import img1 from "../../assets/challenges_img_1.png";
import img2 from "../../assets/challenges_img_2.png";
import img3 from "../../assets/challenges_img_3.png";
import img4 from "../../assets/challenges_img_4.png";

export default function Challenges() {
    return (
        <div className='challenges'>
            <p className='header'>Why Participate in <span>AI Challenges?</span></p>
            <div className='challenges-under'>
                <div className="card-1">
                    <img src={img1} alt="" />
                    <h3>Prove your skills</h3>
                    <p>Gain substantial experience by solving real-world problems <br /> and pit against others to come up with innovative solutions.</p>
                </div>
                <div className="card-2">
                    <img src={img2} alt="" />
                    <h3>Learn from community</h3>
                    <p>One can look and analyze the solutions submitted by the <br /> other Data Scientists in the community and learn from them.</p>
                </div>
                <div className="card-3">
                    <img src={img3} alt="" />
                    <h3>Challenge yourself</h3>
                    <p>There is nothing for you to lose by participating in a <br />challenge. You can fail safe, learn out of the entire <br />experience and bounce back harder.</p>
                </div>
                <div className="card-4">
                    <img src={img4} alt="" />
                    <h3>Earn recognition</h3>
                    <p>You will stand out from the crowd if you do well in AI <br /> challenges, it not only helps you shine in the community but also earns rewards.</p>
                </div>
            </div>
        </div>
    )
}
