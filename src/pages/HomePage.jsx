import { React, useState } from 'react'
import { Link } from 'react-router-dom';

function HomePage() {
    const [user,setUser] = useState('contributer7')
    const [isLoggedIn, setIsLoggedIn] =useState(false)
    const [searchTerm, setSearchTerm] = useState('');

let data = [
    {
        first_name: 'Amber',
        last_initial:'J',
        address: '123 Music st.',
        bill: 50.00,
        tip:5.00,
        user: 'contributer7',
        post: 'friendly and tipped cash'
    },
    {
        first_name: 'Emma',
        last_initial:'B',
        address: '123 Music st.',
        bill: 50.00,
        tip:0.00,
        user: 'contributer7',
        post: 'horrible tipper, well she is a baby'
    },
    {
        first_name: 'Emma',
        last_initial:'B',
        address: '111 Music st.',
        bill: 50.00,
        tip:0.00,
        user: 'contributer7',
        post: 'horrible tipper, well she is a baby'  
    },

]


const filteredData = data.filter(item => item.address.toLowerCase().includes(searchTerm.toLowerCase()));

const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};
  return (
    <div>
    <header>
        <div className='loginHeader'>
            <div>
            <h3><span className='Tipper'>Tipper</span> {user ? <Link className='userHeader' to='*'><span className='divider'>|</span> {user}</Link> : ''}</h3>
            </div>
            <div>
            {isLoggedIn?<Link to='*'><h3>Logout</h3></Link> : <Link to='*'><h3>Login/Sign-up</h3></Link> }
            </div>
        </div>
        <div className='searchBar' >
        <input
        type="text"
        placeholder="Search by Address"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      </div>
    </header>
    <div className='table'>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Initial</th>
            <th>Address</th>
            <th>Bill</th>
            <th>Tip</th>
            <th>User</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.first_name}</td>
              <td>{item.last_initial}</td>
              <td>{item.address}</td>
              <td>${item.bill.toFixed(2)}</td>
              <td>${item.tip.toFixed(2)}</td>
              <td>{item.user}</td>
              <td>{item.post}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
<div className='reviewPaginationFooter'>
    <div>
        <Link to='*'>Add Review</Link>
    </div>
    <div>pagination</div>
</div>
</div>
  )
}

export default HomePage
