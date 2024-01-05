import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className="overlay">
        
        <div className="modal-container">
        <h5 className='noDec'>Would you like to <span className='redText'>Delete</span> this post?</h5>
        <br></br>
          <button className='button cancelDeleteButton' onClick={() => onClose()}>Cancel</button>
          <button className='button cancelDeleteButton deleteButton' onClick={() => onDelete()}>Delete</button>
        </div>
      </div>
    );
  };

export default DeleteConfirmationModal;