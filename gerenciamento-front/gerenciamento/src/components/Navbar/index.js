import '../../../node_modules/bulma/css/bulma.css'
import './navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar() {


    function logout() {
        localStorage.setItem('token', '')
    }

    return(
        <nav className='navbar is-info' >
            <h2>Gerenciamento de usuários</h2>
            <ul className='meus-links'>
                <li>
                    <NavLink to='/usuarios'>usuarios</NavLink>
                </li>
                <li>
                    <NavLink to='/cadastro'>cadastrar</NavLink>
                </li>
                <li>
                    <NavLink to='/login'>login</NavLink>
                </li>
                <li>
                    <NavLink to='/login' onClick={() => logout()}>sair</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar