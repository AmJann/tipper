import { React, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import userIcon from '../images/userIcon.webp'
import edit from '../images/editPencil.jpeg'
import deleteIcon from '../images/delete.jpeg'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import DeleteCommentModal from '../components/DeleteCommentModal'
import EditPostForm from '../components/EditPostForm'

function PostView() {
  const [post, setPost] = useState({});
  const [modFirstName, setModFirstName] = useState('');
  const [modLastInitial, setModLastInitial] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id,setId] = useState();
  const[comments, setComments] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(null);


  const urlParams = useParams();
  const navigate = useNavigate();

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const toggleDeleteCommentModal = (commentId) => {
    setSelectedCommentId(commentId);
    setShowDeleteCommentModal(!showDeleteCommentModal);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      // Implement the comment deletion logic using the appropriate API route
      const commentUrl = process.env.REACT_APP_API_URL + `/comment-detail/${commentId}/`;
      const commentOpts = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': 'Content-Type, Authorization',
        },
      };

      await fetch(commentUrl, commentOpts);
      // Optionally, you can handle success or refresh the comment list.
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }

    // Close the modal after deletion
    toggleDeleteCommentModal();
  };


  const toggleDeleteModal = () => {
    console.log('Toggling modal');
    setShowDeleteModal(!showDeleteModal);
  };
  

  function formatDateTime(dateTimeString) {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
  
    return new Date(dateTimeString).toLocaleString(undefined, options);
  }

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + `/post-detail/${urlParams.id}/`;
    const opts = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    };

    fetch(url, opts)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setModFirstName(data.first_name?.[0].toUpperCase() + data.first_name?.slice(1));
        setModLastInitial(data.last_initial?.toUpperCase());
        setLoading(false);
        setId(urlParams.id)
      })
      .catch((error) => {
        setError('Error fetching post data');
        setLoading(false);
      });
  }, [urlParams.id]);

useEffect(() => {
  const url = process.env.REACT_APP_API_URL;
  const fetchComments = async () => {
    try {
      const response = await fetch(`${url}/comment-list`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      const filterData = data.filter((comment) => comment.post_comment.includes(urlParams.id));
      setComments(filterData);
    } catch (error) {
      console.error('Error fetching comments:', error.message);
    }
  };

  fetchComments();
}, [urlParams.id,comments]);

const handleDeletePost = async () => {
  try {
    const url = process.env.REACT_APP_API_URL + `/post-detail/${urlParams.id}/`;
    const opts = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': 'Content-Type, Authorization',
      },
    };

    await fetch(url, opts);
    // Optionally, you can handle success or navigate back to a post list page.
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }

  navigate('/')
  toggleDeleteModal();
};

return (
  <div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    <div className='userPostContainer'>
      <div className='userImageContainer'>
          <img className='userImage' src={userIcon} alt='user default icon'></img>
          {post && <p className='userText'>user: {post.user}</p>}
          {post && <p className='userText'>{formatDateTime(post.date_updated)}</p>}
        </div>
      <div className='postAllContainer'>
      <div className="postContainer">
            {isEditing ? (
              <EditPostForm post={post} onCancel={toggleEditMode} onUpdatePost={setPost} />
            ) : (
              <>
                {modFirstName && (
                  <h3>
                    <span className="customerSpan">Customer:</span> {modFirstName} {modLastInitial}
                  </h3>
                )}
                {post && <h6>{post.address}</h6>}
                {post && <h6><span className="customerSpan">Tip: </span>${post.tip}</h6>}
                {post && <p>{post.post}</p>}
              </>
            )}
          </div>
      <div className='editDeleteContainer'>
        <img title="edit" className='editDeleteIcon' src={edit} alt='edit' onClick={() => toggleEditMode()}></img>
        <img title="delete" className='editDeleteIcon' src={deleteIcon} alt='delete'   onClick={() => toggleDeleteModal()}></img>
      </div>

      </div>
    </div>
    {comments && comments.map((item, index) => (
      <div className='commentAllContainer' key={index}>
        <div className='userImageContainer'>
          <img className='userImage userImageComment' src={userIcon} alt='user default icon'></img>
        </div>
        <div className='commentContainer'>
          <div className='comment'>
            <h4>User: {item.user}</h4>
            <h5>{formatDateTime(item.date_updated)}</h5>
            <p>{item.comment}</p>
          </div>
          <div className='editDeleteContainer'>
            <img title='edit' className='editDeleteIcon' src={edit} alt='edit'></img>
            <img title='delete' className='editDeleteIcon' src={deleteIcon} alt='delete' onClick={() => toggleDeleteCommentModal(item.id)}></img>
          </div>
        </div>
      </div>
    ))}
    {id && <CommentForm id={id} />}
    {showDeleteModal && (
  <DeleteConfirmationModal
    isOpen={showDeleteModal}
    onClose={toggleDeleteModal}
    onDelete={handleDeletePost} // Implement this function
  />
  
)}
    {showDeleteCommentModal && (
  <DeleteCommentModal
    isOpen={showDeleteCommentModal}
    onClose={toggleDeleteCommentModal}
    onDelete={handleDeleteComment}
    commentId={selectedCommentId}
  />
  )}
  </div>
);
}

export default PostView;