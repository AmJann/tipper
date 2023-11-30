import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import CommentForm from '../components/CommentForm';

function PostView() {
  const [post, setPost] = useState({});
  const [modFirstName, setModFirstName] = useState('');
  const [modLastInitial, setModLastInitial] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id,setId] = useState();

  const urlParams = useParams();

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

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {post && <h3>{post.date_updated}</h3>}
      {post && <h3>user: {post.user}</h3>}
      {modFirstName && <h3>{modFirstName}</h3>}
      {post && <h3>{modLastInitial}</h3>}
      {post && <h3>{post.address}</h3>}
      {post && <h3>{post.post}</h3>}
      {id && <CommentForm id = {id}/>}
    </div>
  );
}

export default PostView;