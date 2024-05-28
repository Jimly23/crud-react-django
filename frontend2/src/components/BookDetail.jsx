import React from 'react';

const BookDetail = ({ toView, openView, handleClose }) => {
  return (
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
  );
}

export default BookDetail;
