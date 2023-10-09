import {React, useState} from 'react'

function AddForm() {
const [address, setAddress] = useState('4524 s Cranberry blvd')
const [review, setReview] = useState()

const handleAddressChange = (e) => {
    setAddress(e.target.value)
}

const handleSubmit = (e)=>{
    setReview(e.target.value)
}
  return (
    <div>
        <h3> Add review for {address} address or type here and click change</h3>
        <form onSubmit={handleAddressChange}>
            <label>
                <button type='submit'>Change</button>
                <input type='text' placeholder='Type address here'></input>
            </label>
        </form>
        <form onSubmit={handleSubmit}>
            <label>
                <input type='text' placeholder='First name'></input>
            </label>
            <label>
                <input type='text' placeholder='Last name'></input>
            </label>
        </form>
    </div>
  )
}

export default AddForm