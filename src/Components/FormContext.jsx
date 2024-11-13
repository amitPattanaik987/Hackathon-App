import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        challengeName: '',
        startDate: '',
        endDate: '',
        description: '',
        image: null,
        level: 'Easy',
    });

    const [hackathons, setHackathons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        status: [],
        level: [],
    });

    const [spinner, setspinner] = useState(false);
    const [cardclicked, setcardclicked] = useState();

    return (
        <FormContext.Provider
            value={{
                cardclicked,
                setcardclicked,
                spinner,
                setspinner,
                formData,
                setFormData,
                hackathons,
                setHackathons,
                searchQuery,
                setSearchQuery,
                filters,
                setFilters,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => {
    return useContext(FormContext);
};
