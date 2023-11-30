import { React, useState} from 'react'
import { Link } from 'react-router-dom';
const user = 'contributer7';
function Header({isLoggedIn}) {
  return (
    <div>
        <header>
            <div className='loginHeader'>
                <div>
                    <h3><Link className='noDec' to="/"><span className='tipper'>Tipper</span></Link> {user ? <Link className='userHeader' to='/'><span className='divider'>|</span> <span className='user'>{user}</span></Link> : ''}</h3>
                </div>
                <div>
                    {isLoggedIn?<Link className='logoutLogin' to=''><h4>Logout</h4></Link> : <Link className='logoutLogin' to='*'><h4>Login/Sign-up</h4></Link> }
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header