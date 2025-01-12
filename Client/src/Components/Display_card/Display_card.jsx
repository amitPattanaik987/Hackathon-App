import React, { useEffect } from 'react';
import "./Display_card.css";
import Create_card from '../create_card/Create_card';
import { useFormContext } from '../FormContext';

export default function Display_card({ filterClick }) {
    const { hackathons, searchQuery, filters, setHackathons } = useFormContext();

    useEffect(() => {
        fetch("http://localhost:3000/gethackathons")
            .then((res) => res.json())
            .then((data) => {
                setHackathons(data);
            })
            .catch((error) => {
                console.error("Error fetching hackathons:", error);
            });
    }, [setHackathons]);

    const getStatus = (startDate, endDate) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return 'Upcoming';
        } else if (now >= start && now <= end) {
            return 'Active';
        } else {
            return 'Past';
        }
    };

    const matchesSearch = (name) => {
        return name && name.toLowerCase().includes(searchQuery.toLowerCase());
    };

    const matchesFilters = (status, level) => {
        const statusMatches = filters.status.length === 0 || filters.status.includes(status) || filters.status.includes('All');
        const levelMatches = filters.level.length === 0 || filters.level.includes(level);
        return statusMatches && levelMatches;
    };


    const filteredHackathons = (hackathons || []).filter((item) => {
        const status = getStatus(item.startDate, item.endDate);
        return matchesSearch(item.name) && matchesFilters(status, item.level);
    });

    return (
        <div className={`display-card ${filterClick && `dimmed`}`}>
            {filteredHackathons.map((item, index) => (
                <Create_card
                    key={index}
                    className="display-card1"
                    name={item.name}
                    status={getStatus(item.startDate, item.endDate)}
                    endDate={item.endDate}
                    image={item.image}
                />
            ))}
        </div>
    );
}
