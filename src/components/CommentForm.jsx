import React from 'react'
import Header from './Header'

function CommentForm() {
  return (
    <div>
        <form>
            <label>
                <textarea type='text'placeholder='comment'cols="41" rows="5"></textarea>
            </label>
        </form>
    </div>
  )
}

export default CommentForm