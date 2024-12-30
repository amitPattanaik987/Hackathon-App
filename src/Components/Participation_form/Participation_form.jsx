// HackathonForm.js
import React, { useState } from 'react';
import "./Participation_form.css"
import { useNavigate, useParams } from 'react-router-dom';

function Participation_form() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        age: '',
        gender: '',
        university: '',
        role: '',
        fieldOfStudy: '',
        graduationYear: '',
        teamName: '',
        teamRole: '',
        skills: '',
        hackathonExperience: '',
        city: '',
        state: '',
        country: '',
        agreeTerms: false,
        parentalConsent: false,
        photoRelease: false,
        linkedIn: '',
        gitHub: '',
        teamMembers: [''],
    });
    const path = useParams();
    const hackathon = path.hackathon_name;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleMemberChange = (index, value) => {
        const newTeamMembers = [...formData.teamMembers];
        newTeamMembers[index] = value;
        setFormData({ ...formData, teamMembers: newTeamMembers });
    };

    const addMember = () => {
        if (formData.teamMembers.length < 6) {
            setFormData((prevData) => ({
                ...prevData,
                teamMembers: [...prevData.teamMembers, ''],
            }));
        } else {
            alert("Maximum 6 team members allowed.");
        }
    };

    const removeMember = (index) => {
        const newTeamMembers = formData.teamMembers.filter((_, i) => i !== index);
        setFormData({ ...formData, teamMembers: newTeamMembers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        fetch("https://hackathon-app-9hq6.onrender.com/participate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ hackathon: hackathon, userdata: formData })
        }).then((response) => response.json()).then((data) => {
            if (data.success) {
                const login_email = localStorage.getItem("email");
                fetch("https://hackathon-app-9hq6.onrender.com/participated_hackathons", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ user: login_email, hackathon: hackathon })
                }).then((response) => response.json()).then((data) => {
                    if (data.success) {
                        navigate(`/problem/${hackathon}/participation/participate`);
                    } else {
                        alert("Error Occurred ");
                    }
                })
            } else {
                alert("Invalid Details");
            }
        })
    };

    return (
        <div className='px-[300px] big-container'>
            <form onSubmit={handleSubmit} className="py-[30px] flex flex-col form-container gap-[50px] justify-center items-center">
                <h1 className="text-white">Participation Form</h1>

                <div>
                    <label>Full Name:</label>
                    <input className='form-control' type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>

                <div>
                    <label>Email:</label>
                    <input className='form-control' type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label>Phone Number:</label>
                    <input className='form-control' type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div>
                    <label>Age:</label>
                    <input className='form-control' type="number" name="age" value={formData.age} onChange={handleChange} />
                </div>

                <div>
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label>University/Company:</label>
                    <input className='form-control' type="text" name="university" value={formData.university} onChange={handleChange} />
                </div>

                <div>
                    <label>Current Role:</label>
                    <input className='form-control' type="text" name="role" value={formData.role} onChange={handleChange} />
                </div>

                <div>
                    <label>Field of Study:</label>
                    <input className='form-control' type="text" name="fieldOfStudy" value={formData.fieldOfStudy} onChange={handleChange} />
                </div>

                <div>
                    <label>Graduation Year:</label>
                    <input className='form-control' type="number" name="graduationYear" value={formData.graduationYear} onChange={handleChange} />
                </div>

                <div>
                    <label>Team Name:</label>
                    <input className='form-control' type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
                </div>

                <div>
                    <label>Role in Team:</label>
                    <input className='form-control' type="text" name="teamRole" value={formData.teamRole} onChange={handleChange} />
                </div>

                <div>
                    <label>Skills/Expertise:</label>
                    <input className='form-control' type="text" name="skills" value={formData.skills} onChange={handleChange} />
                </div>

                <div>
                    <label>Previous Hackathon Experience:</label>
                    <select name="hackathonExperience" value={formData.hackathonExperience} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label>City:</label>
                    <input className='form-control' type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>

                <div>
                    <label>State:</label>
                    <input className='form-control' type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>

                <div>
                    <label>Country:</label>
                    <input className='form-control' type="text" name="country" value={formData.country} onChange={handleChange} />
                </div>

                <div>
                    <label className='w-[70%] '>
                        <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} style={{ width: "30px" }} /> Agree to Terms & Conditions
                    </label>
                </div>

                <div>
                    <label className='w-[70%]'>
                        <input type="checkbox" name="parentalConsent" checked={formData.parentalConsent} onChange={handleChange} style={{ width: "30px" }} /> Parental Consent (if underage)
                    </label>
                </div>

                <div>
                    <label className='w-[70%]'>
                        <input type="checkbox" name="photoRelease" checked={formData.photoRelease} onChange={handleChange} style={{ width: "30px" }} /> Photo/Media Release
                    </label>
                </div>

                <div>
                    <label>LinkedIn Profile:</label>
                    <input className='form-control' type="url" name="linkedIn" value={formData.linkedIn} onChange={handleChange} />
                </div>

                <div>
                    <label>GitHub Profile:</label>
                    <input className='form-control' type="url" name="gitHub" value={formData.gitHub} onChange={handleChange} />
                </div>
                <div>
                    <label>Team Members (Max 6):</label>
                    {formData.teamMembers.map((member, index) => (
                        <div key={index} className="team-member-input">
                            <input
                                className='form-control'
                                type="text"
                                value={member}
                                placeholder={`Team Member ${index + 1}`}
                                onChange={(e) => handleMemberChange(index, e.target.value)}
                            />
                            {formData.teamMembers.length > 1 && (
                                <button type="button" onClick={() => removeMember(index)} className='btn btn-info' >Remove</button>
                            )}
                        </div>
                    ))}
                    {formData.teamMembers.length < 6 && (
                        <button type="button" onClick={addMember} className='btn btn-secondary'>Add Member</button>
                    )}
                </div>

                <div>
                    <button className='submit-button btn btn-danger' type="submit" >Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Participation_form;
