import {React, useState, useEffect} from 'react'
import Header from './Header'

function CommentForm(id) {
    const [comment,setComment] = useState('')
    const user = 1;
    const resetForm = () => {
        setComment('');
      };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        
        console.log(JSON.stringify({
            comment:comment,
            user: user,
            post_comment: id.id
      }))
        const url = process.env.REACT_APP_API_URL;
        const fullUrl = `${url}/comment-list/`;
        
        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment:comment,
                    user: user,
                    post_comment: id.id
                }),
            });
      
            if (response.ok) {
                setComment('');
                console.log('Comment submitted successfully!');
            } 
            else {
                console.error('Failed to submit comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }
      };

      useEffect(() => {
        console.log('Comment state:', comment);
      }, [comment]);
  return (
    <div className='commentForm'>
        <form onSubmit={handleCommentSubmit}>
            <div className='commentForm'>
            <label>
                <textarea type='text' value={comment} placeholder='comment'cols="41" rows="5" onChange={(e) => setComment(e.target.value)}></textarea>
            </label>
            <br></br>
            <button className='submitComment button' alt ='submit comment' type='submit'>Submit Comment</button>
            </div>
        </form>
    </div>
  )
}

export default CommentForm