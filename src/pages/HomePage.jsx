import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Header from '../components/Header';


function HomePage() {
    const [user,setUser] = useState('contributer7')
    const [posts,setPosts] = useState()
    const [isLoggedIn, setIsLoggedIn] =useState(true)
    const [searchTerm, setSearchTerm] = useState('');
   

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


    const filteredData = posts ? posts.filter(item => item.address.toLowerCase().includes(searchTerm.toLowerCase())) : [];

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
  return (
    <div>
    <div className='searchBarContainer' >
        <input
        className='searchBar'
        type="text"
        placeholder="Search by Address"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
<div className='tableContainer'>
    <div className='table'>

      <Table striped>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Address</th>
            <th>Tip</th>
            <th>User</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
          
            <tr key={index}>
              <td className='value'>{item.first_name}</td>
              <td className='value'>{item.last_initial}</td>
              <td className='value'>{item.address}</td>
              <td className='value'>${item.tip.toFixed(2)}</td>
              <td className='value'>{item.user}</td>
              <td><Link className="noDec value viewPost"to={`/post/${item.id}`}>View Post</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
</div>
<div className='reviewPaginationFooter'>
    <div>
        <h5 ><Link className='noDec add' to='add'>Add Review</Link></h5>
    </div>
    <div><h5 className='noDec'>pagination</h5></div>
</div>
</div>
  )
}

export default HomePage
