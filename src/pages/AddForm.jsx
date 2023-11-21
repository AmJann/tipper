import {React, useState, useEffect} from 'react'
import CurrencyInput from 'react-currency-input-field';
const user = 1;
function AddForm() {
const [address, setAddress] = useState('')
const [value, setValue] = useState();
const [value2, setValue2] = useState(8.00);
const [inputs,setInputs] = useState({
    address:'',
    first_name: '',
    last_initial: '',
    tip:'',
    bill:'',
    post:'',
    user:'',
})
const [review, setReview] = useState({
})
const [posts, setPosts] = useState([]);
const resetForm = () => {
  // Reset the form fields to their initial state
  setInputs({
    address: '',
    first_name: '',
    last_initial: '',
    comment: '',
  });
  setValue('')
};

const handleAddressSubmit = (e)=>{
    e.preventDefault();
    setAddress(inputs.address)
}

const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]: value}))
    console.log('name:',name,'value:',value)
}

const handleReviewSubmit = async (e) => {
  e.preventDefault();
  
  console.log(JSON.stringify({
    address: inputs.address,
    first_name: inputs.first_name,
    last_initial: inputs.last_initial,
    tip: parseFloat(value),
    bill: parseFloat(value2),
    post: inputs.comment,
    user:parseInt(user)
}))
  const url = process.env.REACT_APP_API_URL;
  const fullUrl = `${url}/post-list/`;
  
  try {
      const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: inputs.address,
            first_name: inputs.first_name,
            last_initial: inputs.last_initial,
            bill: parseFloat(value2),
            tip: parseFloat(value),
            post: inputs.comment,
            user:parseInt(user)
          }),
      });

      if (response.ok) {
          // Success, handle accordingly
          console.log('Review submitted successfully!');
          resetForm()
          // You can reset the form or do any other action upon success
      } 
      else {
          // Handle errors
          console.error('Failed to submit review:', response.statusText);
      }
  } catch (error) {
      console.error('Error submitting review:', error.message);
  }
};

useEffect(() => {
  const url = process.env.REACT_APP_API_URL;
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${url}/post-list`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error.message);
    }
  };

  fetchPosts();
}, []);





const limit = 100000;
const handleOnValueChange = (value, _)=> {
  

    if (!value) {
      setValue('');
      return;
    }

    if (Number.isNaN(Number(value))) {
      return;
    }

    if (Number(value) > limit) {
      setValue(value);
      return;
    }


    setValue(value);
    

  };
  // const limit2 = 100000;
  // const handleOnValueChange2 = (value2, _)=> {
  

  //   if (!value2) {
  //     setValue2('');
  //     return;
  //   }

  //   if (Number.isNaN(Number(value2))) {
  //     return;
  //   }

  //   if (Number(value2) > limit2) {
  //     setValue2(value2);
  //     return;
  //   }


  //   setValue(value2);
    

  // };

  return (
    <div>
        {(address ? <h3> Add review for <span className='address'><strong>{address}</strong></span> or set new address to begin review</h3> : <h3>set address then add review</h3>)}
        <form onSubmit={handleAddressSubmit}>
  
                <button type='submit'>Set address</button>
                <input name ='address'type='text' value={inputs.address} onChange={handleInputChange} placeholder='Type address here'></input>
       
        </form>
        <form onSubmit={handleReviewSubmit}>
            <label>
                <input type='text' value={inputs.first_name} name="first_name" onChange={handleInputChange} placeholder='First name'></input>
            </label>
            <label>
                <input type='text' value={inputs.last_initial} name="last_initial" onChange={handleInputChange} placeholder='Last name'></input>
            </label>
            <div>
                {/* <CurrencyInput  name="tip"  type='text'  decimalSeparator="," groupSeparator="." decimalsLimit={2} placeholder='Tip' />
                <CurrencyInput value={inputs.bill} name="bill" onValueChange={handleInputChange} type='text' prefix="$" decimalsLimit={2} placeholder='Bill amount' /> */}
                <CurrencyInput
                id="validationCustom01"
                name="field1"
                value={value}
                onValueChange={handleOnValueChange}
                placeholder="Tip"
                prefix='$'
                step={1}
              />
                <CurrencyInput
                id="validationCustom02"
                name="field2"
                value={value2}
                onValueChange={handleOnValueChange}
                placeholder="Bill"
                prefix='$'
                step={2}
              />
            </div>
            <div>
                <textarea placeholder="Comment" value={inputs.comment} name="comment" onChange={handleInputChange} id="comment" cols="41" rows="5"></textarea>
            </div>
            <div>
                <button type='submit'>Submit Review</button>
            </div>
        </form>
        <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>
    </div>
  )
}

export default AddForm