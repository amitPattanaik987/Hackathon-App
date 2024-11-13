import React, { useState } from 'react';
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [login, setlogin] = useState(true);
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [username, setusername] = useState();
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const minLength = 8; // Minimum length
        const hasUpperCase = /[A-Z]/.test(password); // At least one uppercase letter
        const hasLowerCase = /[a-z]/.test(password); // At least one lowercase letter
        const hasNumbers = /\d/.test(password); // At least one digit
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password); // At least one special character

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
    }

    const signupclicked = () => {
        if (!(email.endsWith("@gmail.com"))) {
            alert("Email Should Contain '@gmail.com'");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character.");
            return;
        }

        fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username, password, email
            })
        }).then(response => response.json())
            .then(data => {
                location.reload();
            })
            .catch(error => console.error('Error:', error));
    }

    const loginclicked = () => {
        if (!(email.endsWith("@gmail.com"))) {
            alert("Email Should Contain '@gmail.com'");
            return;
        }
        if (!validatePassword(password)) {
            alert("Invalid Password. Make sure your password meets the required criteria.");
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                password, email
            })
        }).then(response => response.json())
            .then((data) => {
                if (data.success) {
                    const token = data.token;
                    const newemail = data.logged_in_email;
                    localStorage.setItem("token", token);
                    localStorage.setItem("email", newemail);
                    navigate("/home")
                    location.reload();
                }
                else {
                    alert("Invalid Credentials Please Recheck");
                    location.reload();
                }
            })
            .catch(error => console.error('Error:', error));
    }

    return (
        <section className="vh-100 gradient-custom">
            <div className=" py-5 px-5 h-100 flex items-center justify-center">
                <div className="flex justify-center items-center h-auto">
                    <div className="">
                        <div className="w-[100%] bg-dark text-white h-auto rounded-xl">
                            <div className="card-body p-5 text-center">
                                <div className="">
                                    {login ? <h2 className="bold text-uppercase mb-2">Login</h2> : <h2 className="bold text-uppercase mb-2">Signup</h2>}
                                    <p className="text-white-50 mb-2">Please enter your Email and Password!</p>

                                    {!login && <div className="form-outline form-white">
                                        <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder=" " onChange={(e) => setusername(e.target.value)} />
                                        <label className="form-label bg-dark px-2 pt-[4px] m-0" htmlFor="typeEmailX">User Name</label>
                                    </div>}

                                    <div className="form-outline form-white">
                                        <input type="email" id="typeEmailX" className="form-control form-control-lg" placeholder=" " onChange={(e) => setemail(e.target.value)} />
                                        <label className="form-label bg-dark px-2 pt-[4px] m-0" htmlFor="typeEmailX">Email</label>
                                    </div>

                                    <div className="form-outline form-white">
                                        <input type="password" id="typePasswordX" className="form-control form-control-lg" placeholder=" " onChange={(e) => setpassword(e.target.value)} />
                                        <label className="form-label bg-dark px-2 pt-[4px] m-0" htmlFor="typePasswordX">Password</label>
                                    </div>

                                    {login && <p className="small pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>}

                                    {login ? <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={loginclicked}>Login</button> : <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={signupclicked}>Sign Up</button>}
                                </div>

                                <div className='mt-[30px]'>
                                    {login ? <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold" onClick={() => setlogin(!login)}>Sign Up</a>
                                    </p> : <p className="mb-0">Already have an account? <a href="#!" className="text-white-50 fw-bold" onClick={() => setlogin(!login)}>Login</a>
                                    </p>}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
