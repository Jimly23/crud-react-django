import React, { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import axios from 'axios'
import './App.css'

function App() {

  // menampung semua data buku
  const [buku, setBuku] = useState([]);

  // membuat data buku baru
  const [newBuku, setNewBuku] = useState({
    judul: '',
    penulis: '',
    penerbit: ''
  });

  // digunakan pada saat klik tombol edit dan menampilkan data buku yang ingin di edit
  const [selectedBuku, setSelectedBuku] = useState(null);

  // menampilkan detail buku
  const [toView, setToView] = useState({
    judul: '',
    penulis: '',
    penerbit: ''
  });

  const [openView, setOpenView] = useState(false)

  useEffect(() => {
    fetchBuku()
  }, [])

  const fetchBuku = () => {
    axios.get("http://localhost:8000/api/buku/")
      .then(response => {
        setBuku(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // handle change
  const handleChange = (e) => {
    setNewBuku({...newBuku, [e.target.name]: e.target.value})
  }

  // handle add book
  const handleAddBook = () => {
    axios.post("http://localhost:8000/api/buku/", newBuku)
     .then(response => {
        setBuku([...buku, response.data])
        setNewBuku({
          judul: '',
          penulis: '',
          penerbit: ''
        })
     })
    .catch((error) => {
      console.log(error)
    })
  }

  // handle close
  const handleClose = (value) => {
    setOpenView(value)
  }

  // handle view click
  const handleViewClick = async (id) => {
    const response = await axios.get(`http://localhost:8000/api/buku/${id}`)
    setToView(response.data)
    setOpenView(true)
  }

  // handle edit click
  const handleEditClick = (buku) => {
    setSelectedBuku(buku)
    setNewBuku(buku)
  }

  // handle cancel edit click
  const handleCancelEditClick = () => {
    setSelectedBuku(null)
    setNewBuku({
      judul: '',
      penulis: '',
      penerbit: ''
    })
  }

  // handle update book
  const handleUpdateBook = () => {
    axios.put(`http://localhost:8000/api/buku/${selectedBuku.id}`, newBuku)
      .then(response => {
        fetchBuku();
        setNewBuku({
          judul: '',
          penulis: '',
          penerbit: ''
        });
        setSelectedBuku(null)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // handle delete book
  const handleDeleteBook = (id) => {
    axios.delete(`http://localhost:8000/api/buku/${id}`)
      .then(response => {
        fetchBuku();
        setNewBuku({
          judul: '',
          penulis: '',
          penerbit: ''
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <div className="app-container">
      <h1>Buku Manajemen Sistem</h1>
      <div className="form-container">
        <div className="input-fields">
          <input type="text" name='judul' value={newBuku.judul} onChange={handleChange} placeholder='Judul' />
          <input type="text" name='penulis' value={newBuku.penulis} onChange={handleChange} placeholder='Penulis' />
          <input type="text" name='penerbit' value={newBuku.penerbit} onChange={handleChange} placeholder='Penerbit' />

          <div className="form-buttons">
            {
              selectedBuku? (
                <>
                  <button  onClick={handleUpdateBook}>Ubah</button>
                  <button onClick={handleCancelEditClick}>Batal</button>
                </>
              ):(
                <button onClick={handleAddBook}>Tambah Buku</button>
              )
            }
          </div>
          
        </div>
      </div>

      <div className="list-book">
        <ul>
          {
            buku.map(item => (
              <li key={item.id}>
                {item.id} | {item.judul} | {item.penulis} | {item.penerbit}

                <div className="actions">
                  <button onClick={() => handleViewClick(item.id)}>View</button>
                  <button onClick={() => handleEditClick(item)}>Edit</button>
                  <button onClick={() => handleDeleteBook(item.id)}>Delete</button>
                </div>  
              </li>
            ))
          }
        </ul>
      </div>

      {
        openView && (
          <>
            <div className='outer-view'>
              <span>Judul {toView.judul}</span>
              <span>Penulis {toView.penulis}</span>
              <span>Penerbit {toView.penerbit}</span>
            </div>
            <button onClick={() => handleClose(false)}>Close</button>
          </>
        )
      }
    </div>
  )
}

export default App
