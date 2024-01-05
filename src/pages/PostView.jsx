import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CommentForm from '../components/CommentForm';
import userIcon from '../images/userIcon.webp'
import edit from '../images/editPencil.jpeg'
import deleteIcon from '../images/delete.jpeg'

function PostView() {
  const [post, setPost] = useState({});
  const [modFirstName, setModFirstName] = useState('');
  const [modLastInitial, setModLastInitial] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id,setId] = useState();
  const[comments, setComments] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const urlParams = useParams();

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
        <div className='postContainer'>
      {modFirstName && <h3><span className='customerSpan'>Customer:</span> {modFirstName} {modLastInitial}</h3>}
      {post && <h6>{post.address}</h6>}
      {post && <h6><span className='customerSpan'>Tip: </span>${post.tip}</h6>}
      {post && <p>{post.post}</p>}
      </div>
      <div className='editDeleteContainer'>
        <img className='editDeleteIcon' src={edit} alt='edit'></img>
        <img className='editDeleteIcon' src={deleteIcon} alt='delete'></img>
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
            <img title='delete' className='editDeleteIcon' src={deleteIcon} alt='delete'></img>
          </div>
        </div>
      </div>
    ))}
    {id && <CommentForm id={id} />}
  </div>
);
}

export default PostView;