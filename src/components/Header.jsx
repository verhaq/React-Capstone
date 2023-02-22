import {useContext} from 'react'
import {NavLink} from 'react-router-dom'

import AuthContext from '../store/authContext'

const Header = () => {
    const authCtx = useContext(AuthContext)

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }
    
    return (
        <header >
               Virtual Plant Nursery
            <nav class="flex justify-end">
                {
                    authCtx.token ? (
                      <ul class="flex justify-between">
                            <li>
                                <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                            </li>
              
                            <li>
                                <button onClick={() => authCtx.logout()}>Logout</button>
                            </li>
                        </ul>
                    ) : (
                      <ul class="flex justify-between" >
                            <li className='pr-3'>
                                <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink style={styleActiveLink} to='/auth'>Login or Sign Up</NavLink>
                            </li>
                        </ul>
                    )
                  }
            </nav>
        </header>
    )
}

export default Header