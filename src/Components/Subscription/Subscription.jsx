import React from 'react';
import "./Subscription.css";
import { loadStripe } from '@stripe/stripe-js';

export default function Subscription() {

    const subscribeclicked = async (e) => {
        console.log( e);
        let type;
        if(e.target.value===300){
            type="3month"
        }
        else{
            type="12month"
        }
        const email=localStorage.getItem("email");
        const stripe = await loadStripe('pk_test_51Pt1NCGwu7WfDqJU4OlQm0xrOJf6W63Ccg20CjPUZe7xKkISIHmL6RMvneFf3rCl31roSBf1gUJdzgqO4iJIJq9T00KcqVqEXY');

        const body = { Amount: e.target.value , type :type , email:email};
        const headers = { "Content-Type": "application/json" };
        const response = await fetch("https://hackathon-app-2-wfdy.onrender.com/payment", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            console.log(result.error);
        }
    }

    return (
        <div className='main1 h-screen w-[100%] flex justify-center'>
            <div className='w-[70%] h-[90vh] flex justify-around items-center text-center card-container'>
                <div className='w-[40%] h-[100%] rounded-[10%] card1'>
                    <div className=' bg-purple-400 h-[30%] rounded-tr-3xl rounded-tl-3xl p-3 heading'>
                        <p className='text-[45px] heading1 m-0'>India's Largest</p>
                        <p className='text-[25px] heading2 m-0'>Hackathon Platform</p>
                    </div>
                    <div className=' bg-white h-[70%] rounded-br-3xl rounded-bl-3xl p-3 flex flex-col gap-[25px] card-down'>
                        <ul className='list-disc text-[20px] flex flex-col gap-2 m-0'>
                            <li>Get Access To Organize Hackathons</li>
                            <li>Represent Your Hackathon Globally</li>
                        </ul>
                        <p className='text-[25px] text-green-600 m-0'>Enjoy The Premium Version For 3months / 60days in 200/-</p>
                        <p className='text-[20px] text-red-600 m-0'>Note :- Payment Is Non-Refundable</p>
                        <button className='w-[250px] h-[60px] bg-purple-500 mx-auto rounded-[30px] text-[20px] button' onClick={subscribeclicked} value={200}>Subscribe</button>
                    </div>
                </div>
                <div className='w-[40%] h-[100%] rounded-[10%] card1'>
                    <div className=' bg-purple-400 h-[30%] rounded-tr-3xl rounded-tl-3xl p-3 heading'>
                        <p className='text-[45px] heading1 m-0'>India's Largest</p>
                        <p className='text-[25px] heading2 m-0'>Hackathon Platform</p>
                    </div>
                    <div className=' bg-white h-[70%] rounded-br-3xl rounded-bl-3xl p-3 flex flex-col gap-[25px] card-down'>
                        <ul className='list-disc text-[20px] flex flex-col gap-2 m-0'>
                            <li>Get Access To Organize Hackathons</li>
                            <li>Represent Your Hackathon Globally</li>
                        </ul>
                        <p className='text-[25px] text-green-600 m-0'>Enjoy The Premium Version For 12months / 365days in 500/-</p>
                        <p className='text-[20px] text-red-600 m-0'>Note :- Payment Is Non-Refundable</p>
                        <button className='w-[250px] h-[60px] bg-purple-500 mx-auto rounded-[30px] text-[20px] button' value={500} onClick={subscribeclicked}>Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
