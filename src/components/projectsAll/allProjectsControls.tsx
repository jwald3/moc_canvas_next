import React from 'react';
import AllProjectsTagTray from './allProjectsTagTray';
import AllProjectsSortAndSearch from './allProjectsSortAndSearch';

const AllProjectsControls = () => {
    return (
        <div>
            <div className="mb-6">
                <AllProjectsSortAndSearch />
                <AllProjectsTagTray />
            </div>
        </div>
    );
};

export default AllProjectsControls;
