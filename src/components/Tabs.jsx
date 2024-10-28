import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTabContent = async () => {
    const response = await axios.get('https://loripsum.net/api/4/short/plaintext');
    return response.data;
};

const Tabs = () => {
    const [currentTab, setCurrentTab] = useState('Title 1');

    const { data: content, isLoading, isError, error } = useQuery({
        queryKey: ['tabContent', currentTab],
        queryFn: fetchTabContent,
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        cacheTime: 1000 * 60 * 30, // Keep cache for 30 minutes
    });
    

    const tabTitles = ['Title 1', 'Title 2', 'Title 3', 'Title 4'];

    return (
        <div className="container">
            <div className="tabs">
                {tabTitles.map((title, index) => (
                    <button
                        key={index}
                        className={currentTab === title ? 'active' : ''}
                        onClick={() => setCurrentTab(title)}
                    >
                        {`Tab ${index + 1}`}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                <h2 className="title">{currentTab}</h2>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error: {error?.message || 'Failed to load content'}</p>}
                {content && <p className="content">{content}</p>}
            </div>
        </div>
    );
};

export default Tabs;
