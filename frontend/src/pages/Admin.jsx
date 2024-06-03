import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}`);
      setPdfs(data);
    };
    fetchPdfs();
  }, []);

  const downloadPdf = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${id}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pdfs.map((pdf) => (
            <tr key={pdf._id}>
              <td>{pdf.author}</td>
              <td>{pdf.title}</td>
              <td>
                <button onClick={() => downloadPdf(pdf._id)}>Download</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
