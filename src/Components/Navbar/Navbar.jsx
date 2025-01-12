import React, { useEffect, useState } from 'react';
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import user_img from "../../assets/user.png";
import crossicon from "../../assets/cross.png";
import error from "../../assets/error.png"

export default function Navbar() {
  const navigate = useNavigate();
  const [hover, sethover] = useState(false);
  const [login, setlogin] = useState(false);
  const [prime, setprime] = useState(false);
  const [popup, setpopup] = useState(false);
  const [popup2, setpopup2] = useState(false);
  const [participated_hackathons, setparticipated_hackathons] = useState([]);
  const [created_hackathons, setcreated_hackathons] = useState([]);

  const homeclicked = () => {
    if (localStorage.getItem("token")) {
      navigate("/");
      window.location.reload();
    } else {
      alert("User Authentication Required");
      location.reload();
    }
  };

  const aboutclicked = () => {
    if (localStorage.getItem("token")) {
      navigate("/about");
    } else {
      alert("User Authentication Required");
      location.reload();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogin(true);
    } else {
      setlogin(false);
    }
    const email = localStorage.getItem("email");
    fetch("https://hackathon-app-2-wfdy.onrender.com/getuser", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ email })
    }).then((response) => response.json()).then((data) => {
      setparticipated_hackathons(data);
    });
  }, []);

  const loginclicked = () => {
    navigate("/login");
  };

  const logoutclicked = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    location.reload();
  };

  const makepayment = async () => {
    const login = localStorage.getItem("token");
    if (login) {
      navigate("/subscription")
    }
    else {
      alert("PLEASE LOGIN FIRST TO ENJOY PREMIUM..")
    }
  };

  useEffect(() => {
    fetch("https://hackathon-app-2-wfdy.onrender.com/getprime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: localStorage.getItem("email") })
    }).then((response) => response.json()).then((data) => {
      if (data.success) {
        setprime(true);
      } else {
        setprime(false);
      }
    });
  }, []);

  const hackathon_joined_clicked = () => {
    const email = localStorage.getItem("email");
    if (email) {
      setpopup(true);
    }
    else {
      alert("Login First Please..")
    }
  };

  const CreateChallenge = () => {
    const newemail = localStorage.getItem("email");

    if (newemail) {
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
          } else {
            alert("Only Prime Members Allowed");
          }
        })
        .catch(error => console.error('Error:', error));
    }
    else {
      alert("Please Login First to Enjoy the features..")
    }
  };

  useEffect(() => {
    if (popup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [popup]);

  const hackathon_clicked = (e) => {
    const hack = e.target.innerHTML
    navigate(`/problem/${hack}/participation/participate`);
    setpopup(false);
  }

  const created_clicked_clicked = () => {


    const email = localStorage.getItem("email");

    if (email) {
      setpopup2(true);
      fetch("https://hackathon-app-2-wfdy.onrender.com/created_hackathon_by_you", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "content-type": "application/json"
        },
        body: JSON.stringify({ email })
      }).then((response) => response.json()).then((data) => {
        setcreated_hackathons(data);
      });
    }
    else {
      alert("Login First Please.")
    }
  }

  const contactclicked = () => {
    const Login = localStorage.getItem("tokrn");
    if (login) {
      navigate("/contact")
    }
    else {
      alert("SIGN IN TO CONTACT US .....")
    }
  }

  return (
    <div className='navbar'>
      <img src={logo} alt="" />
      <ul>
        <li onClick={() => homeclicked()}>HOME</li>
        <li onClick={() => aboutclicked()}>ABOUT</li>
        <li onClick={() => contactclicked()}>CONTACT US</li>
      </ul>
      <div className='flex gap-[60px] last-section'>
        {!prime && <button className='primebtn text-white rounded-xl px-3 bg-gradient-to-r to-pink-500 from-blue-500' onClick={() => makepayment()}>BE A PRIME-MEMBER</button>}
        <a className="navbar-brand" href="#" onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>
          <img src={user_img} alt="Avatar Logo" style={{ width: "40px" }} className="rounded-pill" />
        </a>
        {
          hover && <div className='profile absolute z-10 right-[90px] top-[50px] bg-white p-[10px] rounded-lg text-center flex flex-col gap-2 text-[20px]' onMouseEnter={() => sethover(true)} onMouseLeave={() => sethover(false)}>
            {login ? <p className='m-0 font-bold cursor-pointer hover:bg-slate-200 p-[5px]' onClick={() => logoutclicked()}>Log out</p> : <p className='m-0 font-bold cursor-pointer hover:bg-slate-200 p-[5px]' onClick={() => loginclicked()}>Log in</p>}
            <p className='m-0 font-bold cursor-pointer hover:bg-slate-200 p-[5px]' onClick={() => CreateChallenge()}>Create Hackathon</p>
            <p className='m-0 font-bold cursor-pointer hover:bg-slate-200 p-[5px]' onClick={() => hackathon_joined_clicked()}>Hackathon Joined</p>
            <p className='m-0 font-bold cursor-pointer hover:bg-slate-200 p-[5px]' onClick={() => created_clicked_clicked()}>Created By You</p>
          </div>
        }
        {
          popup && (
            <>
              <div className='overlay' onClick={() => setpopup(false)}></div>
              <div className='popup-container w-[50%] h-[80vh] absolute z-20 right-[27%] top-[150%] bg-white p-[10px] rounded-[20px]'>
                <div className='w-[25px] h-[20px] float-right'>
                  <img src={crossicon} alt="" onClick={() => setpopup(false)} className='cursor-pointer' />
                </div>
                <div>
                  <h2 className='pl-[50px] pt-2'>Joined Hackathons</h2>
                </div>
                {
                  participated_hackathons.length > 0 ? <div className='joined-hackathons-list mt-[20px] overflow-y-auto'>
                    {
                      participated_hackathons.map((item, index) => (
                        <p key={index} className='px-[20px] py-[20px] cursor-pointer hover:bg-slate-200 m-0 rounded-[10px]' onClick={hackathon_clicked}>{item}</p>
                      ))
                    }
                  </div> : <div className='w-[100%] h-[90%] '>
                    <img src={error} alt="" className='mx-auto error-img' />
                    <h1 className='text-green-500 text-center'>No Hackathon Found</h1>
                  </div>
                }
              </div>
            </>
          )
        }
        {
          popup2 && (
            <>
              <div className='overlay' onClick={() => setpopup2(false)}></div>
              <div className='popup-container w-[50%] h-[80vh] absolute z-20 right-[27%] top-[150%] bg-white p-[10px] rounded-[20px]'>
                <div className='w-[25px] h-[20px] float-right'>
                  <img src={crossicon} alt="" onClick={() => setpopup2(false)} className='cursor-pointer' />
                </div>
                <div>
                  <h2 className='pl-[25px] pt-2'>Hackathons Created You</h2>
                </div>
                {
                  created_hackathons.length > 0 ? <div className='joined-hackathons-list mt-[20px] overflow-y-auto'>
                    {
                      created_hackathons.map((item, index) => (
                        <p key={index} className='px-[20px] py-[20px] cursor-pointer hover:bg-slate-200 m-0 rounded-[10px]'>{item}</p>
                      ))
                    }
                  </div> : <div className='w-[100%] h-[90%] '>
                    <img src={error} alt="" className='mx-auto error-img' />
                    <h1 className='text-green-500 text-center'>No Hackathon Found</h1>
                  </div>
                }
              </div>
            </>
          )
        }
      </div>
    </div>
  );
}
