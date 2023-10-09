import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import AddForm from './AddForm';

function HomePage() {
    const [user,setUser] = useState('contributer7')
    const [isLoggedIn, setIsLoggedIn] =useState(true)
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
    {
        first_name: 'Amber',
        last_initial:'J',
        address: '123 Palm st.',
        bill: 50.00,
        tip:5.00,
        user: 'contributer7',
        post: 'friendly and tipped cash'
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
            <h3><span className='tipper'>Tipper</span> {user ? <Link className='userHeader' to='*'><span className='divider'>|</span> <span className='user'>{user}</span></Link> : ''}</h3>
            </div>
            <div>
            {isLoggedIn?<Link className='logoutLogin' to='*'><h4>Logout</h4></Link> : <Link className='logoutLogin' to='*'><h4>Login/Sign-up</h4></Link> }
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
<div className='tableContainer'>
    <div className='table'>

      <Table striped>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
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
              <td className='value'>{item.first_name}</td>
              <td className='value'>{item.last_initial}</td>
              <td className='value'>{item.address}</td>
              <td className='value'>${item.bill.toFixed(2)}</td>
              <td className='value'>${item.tip.toFixed(2)}</td>
              <td className='value'>{item.user}</td>
              <td className='value'>{item.post}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
</div>
<div className='reviewPaginationFooter'>
    <div>
        <h5 ><Link className='noDec add' to='*'>Add Review</Link></h5>
    </div>
    <div><h5 className='noDec'>pagination</h5></div>
</div>
<AddForm />
</div>
  )
}

export default HomePage
