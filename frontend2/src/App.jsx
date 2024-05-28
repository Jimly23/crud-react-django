// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchBooks, addBook, getBookById, updateBook, deleteBook } from './api/api';
import { resetBookForm } from './api/utils';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';

function App() {
  const [buku, setBuku] = useState([]);
  const [newBuku, setNewBuku] = useState(resetBookForm());
  const [selectedBuku, setSelectedBuku] = useState(null);
  const [toView, setToView] = useState({ judul: '', penulis: '', penerbit: '' });
  const [openView, setOpenView] = useState(false);

  useEffect(() => {
    fetchBukuData();
  }, []);

  const fetchBukuData = async () => {
    try {
      const data = await fetchBooks();
      setBuku(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    setNewBuku({ ...newBuku, [e.target.name]: e.target.value });
  }

  const handleAddBook = async () => {
    if(newBuku.judul && newBuku.penulis && newBuku.penerbit){
      try {
        const response = await addBook(newBuku);
        setBuku([...buku, response]);
        setNewBuku(resetBookForm());
      } catch (error) {
        console.log(error);
      }
    }else {
      alert('Data tidak boleh kosong')
    }
  }

  const handleClose = (value) => {
    setOpenView(value);
  }

  const handleViewClick = async (id) => {
    try {
      const data = await getBookById(id);
      setToView(data);
      setOpenView(true);
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditClick = (buku) => {
    setSelectedBuku(buku);
    setNewBuku(buku);
  }

  const handleCancelEditClick = () => {
    setSelectedBuku(null);
    setNewBuku(resetBookForm());
  }

  const handleUpdateBook = async () => {
    try {
      await updateBook(selectedBuku.id, newBuku);
      fetchBukuData();
      setNewBuku(resetBookForm());
      setSelectedBuku(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      await deleteBook(id);
      fetchBukuData();
      setNewBuku(resetBookForm());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app-container">
      <h1>Buku Manajemen Sistem</h1>
      <BookForm
        newBuku={newBuku}
        handleChange={handleChange}
        handleAddBook={handleAddBook}
        handleUpdateBook={handleUpdateBook}
        handleCancelEditClick={handleCancelEditClick}
        selectedBuku={selectedBuku}
      />
      <BookList
        buku={buku}
        handleViewClick={handleViewClick}
        handleEditClick={handleEditClick}
        handleDeleteBook={handleDeleteBook}
      />
      <BookDetail
        toView={toView}
        openView={openView}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
