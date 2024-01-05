import React from 'react';

const DeleteCommentModal = ({ isOpen, onClose, onDelete, commentId }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal-container">
        <p>Are you sure you want to delete this comment?</p>
        <button onClick={() => onClose()}>Cancel</button>
        <button onClick={() => onDelete(commentId)}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
