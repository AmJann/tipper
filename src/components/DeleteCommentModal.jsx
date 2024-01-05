import React from 'react';

const DeleteCommentModal = ({ isOpen, onClose, onDelete, commentId }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal-container">
        <p>Are you sure you want to <span className='redText'>Delete</span> this comment?</p>
        <button className='button cancelDeleteButton'  onClick={() => onClose()}>Cancel</button>
        <button className='button cancelDeleteButton deleteButton' onClick={() => onDelete(commentId)}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
