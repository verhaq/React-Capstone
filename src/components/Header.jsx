import {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import plant2 from '../plant2.png'

import AuthContext from '../store/authContext'

const Header = () => {
    const authCtx = useContext(AuthContext)

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }
    
    return (
        <header class="font-shantell h-[75px]">
            <h1 class=" absolute text-black font-bold text-xl flex">
                <div class=" mr-2 w-10 h-10">
                     <img src={plant2} />
                </div>
               Virtual Plant Nursery
            </h1>

            <nav class="flex justify-end text-[18px] ">
                {
                    authCtx.token ? (
                      <ul class="flex justify-between">
                            <li class='pr-3'>
                                <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                            </li>
                            <li class=' pr-3 hover:text-[#F57145]'>
                                <NavLink style={styleActiveLink} to='/garden'>My Garden</NavLink>
                            </li>
                            <li>
                                <button onClick={() => authCtx.logout()}>Logout</button>
                            </li>
                        </ul>
                    ) : (
                      <ul class="flex justify-between " >
                            <li class='pr-3 hover:text-[#F57145]'>
                                <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                            </li>
                            <li class=' pr-3 hover:text-[#F57145]'>
                                <NavLink style={styleActiveLink} to='/garden'>My Garden</NavLink>
                            </li>
                            <li class="hover:text-[#F57145]">
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