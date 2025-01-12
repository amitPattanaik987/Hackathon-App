import React, { useEffect, useState } from 'react';
import { useFormContext } from '../FormContext';
import "./Search.css";
import 'bootstrap/dist/css/bootstrap.css';
import arrow from "../../assets/down_arrow.png";

export default function Search({ filterClick, setFilterClick, toggleDim }) {
    const { setSearchQuery, filters, setFilters } = useFormContext(); 
    const [filterapplied, setFilterApplied] = useState([]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); 
    };

    const handleFilterClick = () => {
        setFilterClick(!filterClick);
        toggleDim();
    };

    const handleCheckboxChange = (category, value) => {
        setFilters(prevOptions => {
            const newOptions = { ...prevOptions };
            if (newOptions[category].includes(value)) {
                newOptions[category] = newOptions[category].filter(option => option !== value);
            } else {
                newOptions[category].push(value);
            }
            return newOptions;
        });
    };

    useEffect(() => {
        const appliedFilters = [];

        if (filters.status.length > 0) {
            const statusFilters = filters.status.map(status => status);
            appliedFilters.push(...statusFilters);
        }

        if (filters.level.length > 0) {
            const levelFilters = filters.level.map(level => level);
            appliedFilters.push(...levelFilters);
        }

        setFilterApplied(appliedFilters);

    }, [filters]); 

    return (
        <div className='search'>
            <p className='header'>Explore Challenges</p>
            <div className='search-second'>
                <input type="text" placeholder='🔍 Search' onChange={handleSearch} className='text-black'/>
                <button className={`btn btn-light filter-btn ${filterClick ? 'active-filter' : ''}`} onClick={handleFilterClick}>
                    Filter <img src={arrow} alt="" className={`arrow-icon ${filterClick && `rotate`}`} />
                </button>
                {filterClick && (
                    <div className="filter">
                        <div className="filter1">
                            <p>Status</p>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('status', 'All')} />
                                <p>All</p>
                            </div>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('status', 'Active')} />
                                <p>Active</p>
                            </div>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('status', 'Upcoming')} />
                                <p>Upcoming</p>
                            </div>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('status', 'Past')} />
                                <p>Past</p>
                            </div>
                        </div>
                        <div className="filter2">
                            <p>Level</p>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('level', 'Easy')} />
                                <p>Easy</p>
                            </div>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('level', 'Medium')} />
                                <p>Medium</p>
                            </div>
                            <div className='menu-item'>
                                <input type="checkbox" onChange={() => handleCheckboxChange('level', 'Hard')} />
                                <p>Hard</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='applied-filter'>
                {filterapplied.length > 0 && (
                    filterapplied.map((item, index) => (
                        <div key={index} className='applied-filter-inner'>{item}</div>
                    ))
                )}
            </div>
        </div>
    );
}
