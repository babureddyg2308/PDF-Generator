import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const { data } = await axios.get('/api/books');
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const downloadPDF = async (id) => {
        const { data } = await axios.get(`/api/books/download/${id}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${id}.pdf`);
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => downloadPDF(book._id)}>Download PDF</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
