import React from 'react';

const BookForm = ({ newBuku, handleChange, handleAddBook, handleUpdateBook, handleCancelEditClick, selectedBuku }) => {
  return (
    <div className="form-container">
      <div className="input-fields">
        <input type="text" name='judul' value={newBuku.judul} onChange={handleChange} placeholder='Judul' />
        <input type="text" name='penulis' value={newBuku.penulis} onChange={handleChange} placeholder='Penulis' />
        <input type="text" name='penerbit' value={newBuku.penerbit} onChange={handleChange} placeholder='Penerbit' />

        <div className="form-buttons">
          {
            selectedBuku ? (
              <>
                <button onClick={handleUpdateBook}>Ubah</button>
                <button onClick={handleCancelEditClick}>Batal</button>
              </>
            ) : (
              <button onClick={handleAddBook}>Tambah Buku</button>
            )
          }
        </div>

      </div>
    </div>
  );
}

export default BookForm;
