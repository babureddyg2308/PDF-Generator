import React, { useState } from 'react';
import axios from 'axios';
import './CreatePdf.css'

const CreatePdf = () => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [frontCoverImage, setFrontCoverImage] = useState(null);
  const [backCoverImage, setBackCoverImage] = useState(null);
  const [pages, setPages] = useState([{ content: '', alignment: 'left', backgroundImage: null }]);

  const handlePageChange = (index, key, value) => {
    const newPages = [...pages];
    newPages[index][key] = value;
    setPages(newPages);
  };

  const handleFileChange = (e, setImage) => {
    setImage(e.target.files[0]);
  };

  const addPage = () => {
    setPages([...pages, { content: '', alignment: 'left', backgroundImage: null }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('author', author);
    formData.append('title', title);
    formData.append('frontCoverImage', frontCoverImage);
    formData.append('backCoverImage', backCoverImage);
    pages.forEach((page, index) => {
      formData.append(`pages[${index}][content]`, page.content);
      formData.append(`pages[${index}][alignment]`, page.alignment);
      formData.append(`pages[${index}][backgroundImage]`, page.backgroundImage);
    });

    await axios.post(`${process.env.REACT_APP_API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('PDF Created Successfully');
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h1>Create a New Book</h1>
      <div>
        <label>Author: </label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div> <br />
      <div>
        <label>Title: </label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div><br />
      <div>
        <label>Front Cover Image: </label>
        <input type="file" onChange={(e) => handleFileChange(e, setFrontCoverImage)} required />
      </div>
      <div>
        <label>Back Cover Image: </label>
        <input type="file" onChange={(e) => handleFileChange(e, setBackCoverImage)} required />
      </div>
      {pages.map((page, index) => (
        <div key={index}>
          <h3>Page {index + 1}</h3>
          <label>Content: </label>
          <textarea value={page.content} onChange={(e) => handlePageChange(index, 'content', e.target.value)} required /> <br /> <br />
          <label>Alignment: </label>
          <select value={page.alignment} onChange={(e) => handlePageChange(index, 'alignment', e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select> <br /> <br />
          <label>Background Image: </label>
          <input type="file" onChange={(e) => handlePageChange(index, 'backgroundImage', e.target.files[0])} />
        </div>
      ))} <br />
      <button type="button" onClick={addPage} style={{backgroundColor:"green", color:"white", border:"none" ,marginRight:"20px", height:"30px", borderRadius:"5px"}}>Add Page</button>
      <button type="submit" style={{backgroundColor:"orange", color:"white", border:"none" ,marginRight:"20px", height:"30px", borderRadius:"5px"}}>Create PDF</button>
    </form>
  );
};

export default CreatePdf;
