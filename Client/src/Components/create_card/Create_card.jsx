import React, { useEffect, useState } from 'react';
import "./Create_card.css";
import tick from "../../assets/tick_symbol.png";
import Countdown_timer from '../countdown_timer/Countdown_timer';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

export default function Create_card(props) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const formattedDate = dateObj.toLocaleString('en-US', options);
    return formattedDate.replace(day.toString(), `${day}${getOrdinalSuffix(day)}`);
  };

  const getOrdinalSuffix = (number) => {
    const intNumber = parseInt(number);
    if (intNumber % 10 === 1 && intNumber % 100 !== 11) return 'st';
    if (intNumber % 10 === 2 && intNumber % 100 !== 12) return 'nd';
    if (intNumber % 10 === 3 && intNumber % 100 !== 13) return 'rd';
    return 'th';
  };

  const statusText = () => {
    switch (props.status) {
      case 'Active':
        return 'Ends in';
      case 'Upcoming':
        return 'Starts in';
      case 'Past':
        return 'Ends on';
      default:
        return '';
    }
  };

  const getStatusStyles = () => {
    switch (props.status) {
      case 'Active':
        return {
          backgroundColor: '#44924C3D',
          color: 'green',
        };
      case 'Past':
        return {
          backgroundColor: '#FF3C002B',
          color: 'red',
        };
      default:
        return {
          backgroundColor: '#f2c94c40',
          color: 'black',
        };
    }
  };

  const statusStyles = getStatusStyles();

  const handleParticipateClick = () => {
    const login = localStorage.getItem("token");
    if (login) {
      navigate(`/problem/${props.name}`);
    }
    else{
      alert("SIGN IN TO JOIN IN THE HACKATHON ..");
    }
  };
  const [participated_hackathons, setparticipated_hackathons] = useState([])
  const email = localStorage.getItem("email");
  useEffect(() => {
    fetch("http://localhost:3000/getuser", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ email })
    }).then((response) => response.json()).then((data) => {
      setparticipated_hackathons(data);
    });
  }, [])


  return (
    <div className='card'>
      <img src={props.image} alt={props.name} />
      <div className='text-area'>
        <p className='state' style={statusStyles}>{props.status}</p>
        <p style={{ fontWeight: 600 }}>{props.name}</p>
        <p>{statusText()}</p>
        {props.status === 'Past' ? (
          <p>{formatDate(props.endDate)}</p>
        ) : (
          <Countdown_timer targetDate={props.endDate} />
        )}

        {
          participated_hackathons.includes(props.name) ? <div className=''><p className='p-[10px] bg-slate-200 rounded-[10px]'>Joined</p></div> :
            <div>{props.status !== 'Past' && (
              <button className='btn btn-success participate' onClick={handleParticipateClick}>
                <img src={tick} alt="" />
                <p>Participate Now</p>
              </button>
            )}</div>
        }
      </div>
    </div>
  );
}
