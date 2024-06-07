import React, { useState } from 'react';

const PageEditor = ({ pages, setPages }) => {
    const [pageContent, setPageContent] = useState('');
    const [pageBackground, setPageBackground] = useState(null);

    const addPage = () => {
        setPages([...pages, { pageNumber: pages.length + 1, content: pageContent, backgroundImage: pageBackground }]);
        setPageContent('');
        setPageBackground(null);
    };

    const handleFileChange = (e) => {
        setPageBackground(e.target.files[0]);
    };

    return (
        <div>
            <h3>Internal Pages</h3>
            <textarea placeholder="Page Content" value={pageContent} onChange={(e) => setPageContent(e.target.value)}></textarea>
            <input type="file" onChange={handleFileChange} />
            <button onClick={addPage}>Add Page</button>
            <div>
                {pages.map((page) => (
                    <div key={page.pageNumber}>
                        <h4>Page {page.pageNumber}</h4>
                        <p>{page.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageEditor;
