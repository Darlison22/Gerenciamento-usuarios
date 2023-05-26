import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../../node_modules/bulma/css/bulma.css'
import './cadastrar.css'

function Cadastrar() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {

        function isToken() {
            if(token === '') {
                navigate('/login')
            }
        }

        isToken()

    }, [navigate, token])

    async function registerSubmit(e) {
        e.preventDefault()

        let data = {
            name: name,
            email: email,
            password: password
        }

       if(confirmPassword === password) {

            await axios.post('http://localhost:8686/create', data).then((response) => {

                setError(false)
                setName('')
                setPassword('')
                setConfirmPassword('')
                setEmail('')
                console.log(response.data)

            })
            .catch((err) => {
                console.log(err)
            })
       } else {

            setError(true)
            return
       }
    }

    return (
        <div className='container'>
            <form onSubmit={registerSubmit} className='field'>
                <label className='label'>Nome</label>
                <input 
                className='input'
                type='text' 
                value={name} 
                placeholder='digite seu nome' 
                onChange={(e) => setName(e.target.value)} 
                />
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
                 <label className='label'>Confirmar senha</label>
                 <input 
                 className='input'
                 type='password' 
                 value={confirmPassword} 
                 placeholder='**********' 
                 onChange={(e) => setConfirmPassword(e.target.value)} 
                 />
                 <button type='submit' className='button is-success is-large'>Cadastrar</button>
            </form>
            {error && (
                <p>As senhas digitadas não são iguais</p>
            )}
        </div>
    )
}

export default Cadastrar