import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import upload from "../../assets/upload.png";
import { useFormContext } from '../FormContext';

export default function Admin() {
    const navigate = useNavigate();
    const { setspinner } = useFormContext();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [startTime, setStartTime] = useState("");  // New state for start time
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState("Easy");
    const [city, setCity] = useState(""); // New state for Organizer City
    const [state, setState] = useState(""); // New state for State
    const [location, setlocation] = useState("")
    const [problemStatements, setProblemStatements] = useState(
        Array(5).fill({
            statement: "",
            theme: "",
            category: { software: false, hardware: false }
        })
    );

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const handleProblemStatementChange = (index, field, value) => {
        const updatedStatements = [...problemStatements];
        updatedStatements[index] = { ...updatedStatements[index], [field]: value };
        setProblemStatements(updatedStatements);
    };

    const handleCategoryChange = (index, category) => {
        const updatedStatements = [...problemStatements];
        updatedStatements[index] = {
            ...updatedStatements[index],
            category: {
                software: category === "software" ? true : false,
                hardware: category === "hardware" ? true : false
            }
        };
        setProblemStatements(updatedStatements);
    };

    const addProblemStatementField = () => {
        setProblemStatements([
            ...problemStatements,
            { statement: "", theme: "", category: { software: false, hardware: false } }
        ]);
    };

    const handleSubmit = async () => {
        const filledStatements = problemStatements.filter(statement => statement.statement.trim() !== "");
        if (filledStatements.length < 5) {
            alert("Please fill in at least 5 problem statements.");
            return;
        }

        let responseData;
        let formData = new FormData();
        formData.append("image", image);
        setspinner(true);
        await fetch("https://hackathon-app-2-wfdy.onrender.com/image_upload", {
            method: "POST",
            headers: {
                Accept: "application/json"
            },
            body: formData
        }).then((res) => res.json())
            .then((data) => { responseData = data; });

        if (responseData) {
            await fetch("https://hackathon-app-2-wfdy.onrender.com/addhackathon", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, startDate, startTime, endDate, city, state, description, level, problemStatements: filledStatements, responseData, location })
            }).then((res) => res.json())
                .then((data) => {
                    setspinner(false);
                    const email=localStorage.getItem("email");
                    fetch("https://hackathon-app-2-wfdy.onrender.com/setcreatedhackathon", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                        },
                        body:JSON.stringify({name:name,email:email})
                    })
                    navigate('/home');
                }).catch(() => {
                    console.log("Internal Server Error");
                });
        } else {
            console.log("Error in uploading image");
        }
    };

    return (
        <div>
            <div className='header'>
                <p style={{ margin: 0 }}>Challenge Details</p>
            </div>
            <div className='form'>
                <div className='name all'>
                    <p>Challenge Name</p>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='Start-date all'>
                    <p>Start Date</p>
                    <input
                        type="date"
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='end-date all'>
                    <p>End Date</p>
                    <input
                        type="date"
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ border: "2px solid black" }}
                    />
                </div>
                <div className='Start-time all'>  {/* New Time field */}
                    <p>Start Time</p>
                    <input
                        type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ border: "2px solid black" }}
                        className='w-[40%]'
                    />
                </div>

                <div className='city all'>  {/* Organizer City */}
                    <p>Organizer City</p>
                    <input
                        type="text"
                        onChange={(e) => setCity(e.target.value)}
                        style={{ border: "2px solid black" }}
                        className='w-[40%]'
                    />
                </div>
                <div className='city all'>  {/* Organizer City */}
                    <p>Location</p>
                    <input
                        type="text"
                        onChange={(e) => setlocation(e.target.value)}
                        style={{ border: "2px solid black" }}
                        className='w-[40%]'
                    />
                </div>
                <div className=''>
                    <p>State</p>
                    <select
                        onChange={(e) => setState(e.target.value)}
                        style={{ border: "2px solid black" }}
                    >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>

                    </select>
                </div>
                <div className='description all'>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="10"
                        cols="50"
                        maxLength="5000"
                        onChange={(e) => setDescription(e.target.value)}
                        style={{ border: "2px solid black" }}
                    ></textarea>
                </div>
                <div className='image all'>
                    <p>Image</p>
                    {imagePreview ? (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Uploaded preview" style={{ width: '150px', height: 'auto', borderRadius: "10px" }} />
                        </div>
                    ) : (
                        <>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Upload <img src={upload} alt="upload icon" />
                            </label>
                            <input
                                type="file"
                                id="file-upload"
                                onChange={handleFileChange}
                                hidden
                            />
                        </>
                    )}
                </div>
                <div className='drop-down all'>
                    <label htmlFor="dropdown">Level Type</label>
                    <select
                        id="dropdown"
                        onChange={(e) => setLevel(e.target.value)}
                        style={{ border: "2px solid black" }}
                    >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div className='problem-statements all'>
                    <p className='text-[25px] text-red-500'>Problem Statements (Minimum 5)</p>
                    {problemStatements.map((problem, index) => (
                        <div key={index} className="problem-section flex gap-6">
                            <input
                                type="text"
                                value={problem.statement}
                                onChange={(e) => handleProblemStatementChange(index, "statement", e.target.value)}
                                placeholder={`Problem Statement ${index + 1}`}
                                style={{ border: "2px solid black", marginBottom: "10px" }}
                                className='w-[50%]'
                            />
                            <input
                                type="text"
                                value={problem.theme}
                                onChange={(e) => handleProblemStatementChange(index, "theme", e.target.value)}
                                placeholder="Theme"
                                style={{ border: "2px solid black", marginBottom: "10px" }}
                                className='w-[30%]'
                            />
                            <div className="category-checkbox flex gap-4">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={problem.category.software}
                                        onChange={() => handleCategoryChange(index, "software")}
                                    />
                                    Software
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={problem.category.hardware}
                                        onChange={() => handleCategoryChange(index, "hardware")}
                                    />
                                    Hardware
                                </label>
                            </div>

                        </div>
                    ))}

                    <button type="button" onClick={addProblemStatementField} className='bg-slate-300 w-[200px] p-[10px] rounded-md'>
                        Add Problem Statement
                    </button>
                </div>
                <button onClick={handleSubmit} className="btn btn-success w-[200px]">
                    Create Hackathon
                </button>
            </div>
        </div>
    );
}
