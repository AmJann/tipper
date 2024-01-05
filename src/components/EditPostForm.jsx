import React, { useState } from 'react';

const EditPostForm = ({ post,onUpdatePost, onCancel }) => {
    const [editedPost, setEditedPost] = useState(post);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedPost((prevPost) => ({
        ...prevPost,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e, setPost) => {
      e.preventDefault();
  
      try {
        const url = `${process.env.REACT_APP_API_URL}/post-detail/${post.id}/`;
        const opts = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': 'Content-Type, Authorization',
          },
          body: JSON.stringify(editedPost),
        };
  
        const response = await fetch(url, opts);
  
        if (!response.ok) {
          throw new Error('Failed to update post');
        }
  
        // Update the post state in the PostView component
        onUpdatePost(editedPost);
  
        // Optionally, you can handle success or navigate back to the post view page
        console.log('Post updated successfully');
  
        // After updating, you may want to exit the edit mode
        onCancel();
      } catch (error) {
        console.error('Error updating post:', error.message);
      }
    };

  return (
    <form onSubmit={(e) => handleSubmit(e, onUpdatePost)} className="edit-post-form">
    <label>
      First Name:
      <input
        type="text"
        name="first_name"
        value={editedPost.first_name}
        onChange={handleChange}
        className='editInputForm'
      />
    </label>
    <label>
      Last Initial:
      <input
        type="text"
        name="last_initial"
        value={editedPost.last_initial}
        onChange={handleChange}
        className='editInputForm'
      />
    </label>
    <label>
      Address:
      <input
        type="text"
        name="address"
        value={editedPost.address}
        onChange={handleChange}
        className='editInputForm'
      />
    </label>
    <label>
      Tip:
      <input
        type="number"
        name="tip"
        value={editedPost.tip}
        onChange={handleChange}
        className='editInputForm'
      />
    </label>
    <label>
      Post:
      <textarea
        name="post"
        value={editedPost.post}
        onChange={handleChange}
        className='editTextForm'
      ></textarea>
    </label>
    <div className="button-container">
      <button type="submit" className="button cancelDeleteButton">
        Save Changes
      </button>
      <button type="button" onClick={onCancel} className="button cancelDeleteButton deleteButton">
        Cancel
      </button>
    </div>
  </form>
  );
};

export default EditPostForm;
