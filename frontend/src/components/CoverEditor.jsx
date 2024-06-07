import React from 'react';

const CoverEditor = ({ setCover, label }) => {
    const handleFileChange = (e) => {
        setCover(e.target.files[0]);
    };

    return (
        <div>
            <h3>{label}</h3>
            <input type="file" onChange={handleFileChange} />
        </div>
    );
};

export default CoverEditor;
