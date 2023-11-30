import { React, useState, useEffect} from 'react'
import { useParams, Link} from "react-router-dom";






function PostView() {
    const [post,setPost] = useState({})
    const urlParams = useParams()
    useEffect(() => {
        const url =
          process.env.REACT_APP_API_URL + `/post-detail/${urlParams.id}/`;
        const opts = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "Content-Type, Authorization",
          },
        };
    
        fetch(url, opts)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => setPost(data));
      }, []);
  return (
    <div>
       {post? <h3>{post.post}</h3>:''}
    </div>
  )
}

export default PostView