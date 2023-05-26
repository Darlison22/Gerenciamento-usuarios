import {BrowserRouter, Routes, Route} from 'react-router-dom'

//pages
import Cadastrar from '../pages/Cadastrar'
import ListaUsuarios from '../pages/ListaUsuarios'
import Update from '../pages/Update'

import Navbar from '../components/Navbar'
import Login from '../pages/Login'
import Home from '../pages/Home'

function MyRoutes() {
    return(

        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/cadastro' element={<Cadastrar/>}/>
                <Route path='/usuarios' element={<ListaUsuarios/>} />
                <Route path='/update/:id' element={<Update/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes