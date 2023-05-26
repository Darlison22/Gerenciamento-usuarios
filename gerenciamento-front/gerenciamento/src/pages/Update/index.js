import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Update() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const navigate = useNavigate()

    const id = parseInt(localStorage.getItem('myId'))

    useEffect(() => {
        async function dataUser() {
            await axios.get(`http://localhost:8686/user/${id}`)
            .then((response) => {
                
                setName(response.data.user.name)
                setEmail(response.data.user.email)
                setRole(response.data.user.role)
                console.log(response.data.user.name)
            })
            .catch((err) => {
                console.log(err)
                console.log(id)
            })
        }

        dataUser()

    }, [id])

    async function updateSubmit(e) {
        e.preventDefault()

        let data = {
            name: name,
            role: role,
            email: email
        }

        await axios.put(`http://localhost:8686/user/${id}`, data)
        .then((response) => {
            if(response.status === 200) {
                navigate('/usuarios')
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return(
        <div className='container'>
              <form onSubmit={updateSubmit} className='field'>
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
                 <label className='label'>Role</label>
                 <input 
                 className='input'
                 type='text' 
                 value={role} 
                 placeholder='digite o cargo' 
                 onChange={(e) => setRole(e.target.value)} 
                 />
                 <button type='submit' className='button is-success is-large'>Atualizar</button>
            </form>
        </div>
    )
}

export default Update