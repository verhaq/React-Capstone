import {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import AuthContext from '../store/authContext'

const Auth = () => {
    const navigate = useNavigate()

    const [register, setRegister] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const authCtx = useContext(AuthContext)

    const storedId = localStorage.getItem('userId')
    useEffect(() => {
        if(storedId){
            navigate("/");
        }
    }, [storedId]);

    const submitHandler = e => {
        e.preventDefault()

        // setDisplay('none')

        const body = {
            username,
            password
        }

        const url = "http://localhost:4005"

        axios
        .post(register ? `${url}/register` : `${url}/login`, body)
        .then((res) => {
                console.log('AFTER AUTH', res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch(err => {
                setPassword('')
                setUsername('')
            })
    }

    return (
        <main class="text-center">
            {/* <h1>Welcome!</h1> */}
            <form className='form auth-form' onSubmit={submitHandler}>
                <input 
                    type='text' 
                    placeholder='username' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='form-input'/>
                <input 
                    type='password' 
                    placeholder='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form-input'/>
                <button class="text-xs ">
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            {/* <p style={{display: display}} className='auth-msg'>{message}</p> */}
            <button class="p-4" onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
        </main>
    )
}

export default Auth