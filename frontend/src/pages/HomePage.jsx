import React, { useState } from 'react';
import axios from 'axios';
import CoverEditor from '../components/CoverEditor';
import PageEditor from '../components/PageEditor';

const HomePage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pages, setPages] = useState([]);
    const [frontCover, setFrontCover] = useState(null);
    const [backCover, setBackCover] = useState(null);

    const handleSubmit = async () => {
        console.log("Submit button clicked"); // Debugging line
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        if (frontCover) formData.append('frontCover', frontCover);
        if (backCover) formData.append('backCover', backCover);
        pages.forEach((page, index) => {
            formData.append(`pages[${index}][pageNumber]`, page.pageNumber);
            formData.append(`pages[${index}][content]`, page.content);
            if (page.backgroundImage) {
                formData.append(`pages[${index}][backgroundImage]`, page.backgroundImage);
            }
        });

        try {
            console.log("Sending request to API"); // Debugging line
            await axios.post(`${process.env.REACT_APP_API_URL}/api/books`, formData);
            alert('Book created successfully!');
        } catch (error) {
            console.error('There was an error creating the book!', error);
            alert('Error creating book');
        }
    };

    return (
        <div>
            <h1>Create Your Book</h1>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <CoverEditor setCover={setFrontCover} label="Front Cover" />
            <CoverEditor setCover={setBackCover} label="Back Cover" />
            <PageEditor pages={pages} setPages={setPages} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default HomePage;
