import { React, useState } from 'react'

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
        <div>
        <h3>Tipper | {user}</h3>
        </div>
        <div>
        {isLoggedIn?<h3>Logout</h3>:<h3>Sign-up | Login</h3>}
        </div>
        <input
        type="text"
        placeholder="Search by Address"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </header>
    <div>

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

</div>
  )
}

export default HomePage
