import React from 'react';

const BookList = ({ buku, handleViewClick, handleEditClick, handleDeleteBook }) => {
  return (
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
  );
}

export default BookList;
