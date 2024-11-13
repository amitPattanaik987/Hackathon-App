import React, { useEffect, useState } from 'react';
import './Problems.css';
import { useNavigate } from 'react-router-dom';

export default function Problems({ hackathon_name }) {

  const [collecteddata, setcollecteddata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/problems", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ cardclicked: hackathon_name })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setcollecteddata(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [hackathon_name]);

  const handleParticipate = () => {
    const encodedHackathonName = encodeURIComponent(hackathon_name);
    navigate(`/problem/${encodedHackathonName}/participation`);

  };

  return (
    <div>
      <div className="banner w-[100%] h-[50vh] mb-[50px]">
        <h1>PROBLEM STATEMENTS</h1>
      </div>
      <div className="problems-container px-[150px]">
        <table className="problems-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Problem Statement Title</th>
              <th>Category</th>
              <th>Theme</th>
            </tr>
          </thead>
          <tbody>
            {collecteddata.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.statement}</td>
                <td>{item.category.software ? "Software" : "Hardware"}</td>
                <td>{item.theme}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='pb-[50px] pr-[50px]'>
        <button className='btn btn-success float-right w-[200px]' onClick={handleParticipate}>
          Participate
        </button>
      </div>
    </div>
  );
}
