import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../../../node_modules/bulma/css/bulma.css'
import './listausuarios.css'
import { Link, useNavigate } from 'react-router-dom'

function ListaUsuarios() {

    const [users, setUsers] = useState([])

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {

        function isToken() {
            if(token == '') {
                navigate('/login')
                return
            }
        }

        isToken()

        //var req = {
       //     Authorization: 'Bearer ' + localStorage.getItem('token')
       // }

        async function fetchUsers() {

            await axios.get('http://localhost:8686/users')
            .then((response) => {
                setUsers(response.data)
            })
            .catch(err => {
                console.log(err)
            })
        }

        fetchUsers()

    }, [navigate, token])


    async function deleteUser(id) {

        let data = []

        await axios.delete(`http://localhost:8686/user/${id}`)
        .then((response) => {
            console.log(response.data)
            for(let i = 0; i<users.length; i++) {

                if(users[i].id !== id) {
                    data.push(users[i])
                }
            }

            setUsers(data)
            console.log('meus dados:',data)

        })
        .catch((err) => {
            console.log(err)
        })

    }

    function editUser(id) {
        localStorage.setItem('myId', id)
    }

    return(
        <div className='container-lista'>
            <table className='table is-bordered is-large'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                   {users.map((user) => {
                    return(
                    <tr key={user.id}>     
                        <th>{user.id}</th>
                        <th>{user.name}</th>
                        <th>{user.email}</th>
                        <th>{user.role}</th>
                        <th><button className='button is-primary' onClick={() => editUser(user.id)}><Link to={`/update/${user.id}`}>Editar</Link></button>  <button className='button is-warning' onClick={() => deleteUser(user.id)}>Excluir</button></th>
                    </tr>
                    )
                   })}
                </tbody>
            </table>
        </div>
    )

}

export default ListaUsuarios