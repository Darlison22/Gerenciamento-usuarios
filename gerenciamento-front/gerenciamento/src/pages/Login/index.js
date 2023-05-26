import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function Login() {

   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const token = localStorage.getItem('token')
   const navigate = useNavigate()

   useEffect(() => {

        function isToken() {
            if(token !== '') {
                navigate('/usuarios')
            }
        }

        isToken()

    }, [navigate, token])

    async function loginSubmit(e) {
        e.preventDefault()

        let data = {
            email: email,
            password: password
        }

        await axios.post('http://localhost:8686/auth', data)
        .then((response) => {
            if(response.status === 200) {
                console.log('token:',response.data.token)
                localStorage.setItem('token', JSON.stringify(response.data.token))
                navigate('/usuarios')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className='container'>
            <form onSubmit={loginSubmit} className='field'>
                <label className='label'>Email</label>
                <input 
                className='input'
                type='email' 
                value={email} 
                placeholder='user@gmail.com' 
                onChange={(e) => setEmail(e.target.value)}
                 />
                 <label className='label'>Senha</label>
                 <input 
                 className='input'
                 type='password' 
                 value={password} 
                 placeholder='*********' 
                 onChange={(e) => setPassword(e.target.value)} 
                 />
                 <button type='submit' className='button is-success is-large'>Entrar</button>
            </form>
        </div>
    )
}

export default Login