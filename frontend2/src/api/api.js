// api.js

import axios from 'axios';

export const fetchBooks = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/buku/");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addBook = async (newBook) => {
  try {
    const response = await axios.post("http://localhost:8000/api/buku/", newBook);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/buku/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBook = async (id, updatedBook) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/buku/${id}`, updatedBook);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/buku/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
