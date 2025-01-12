import React from 'react'
import "./Achievements.css"
import Ai from "../../assets/Ai_symbol.png";
import person from "../../assets/Person_symbol.png"
import robot from "../../assets/Robot_img.png"

function Achievements() {
    return (
        <div className='Achievements'>
            <div className='box'>
                <img src={Ai} alt="" />
                <div>
                    <p>100K+</p>
                    <p>AI model submissions</p>
                </div>
            </div>
            <hr />
            <div className='box box2'>
                <img src={person} alt="" />
                <div>
                    <p>50K+</p>
                    <p>Data Scientists</p>
                </div>
            </div>
            <hr />
            <div className='box box2'>
                <img src={robot} alt="" />
                <div>
                    <p>100+</p>
                    <p>AI Challenges hosted</p>
                </div>
            </div>
        </div>
    )
}

export default Achievements
