
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Sidebar from './atom/Sidebar';
import Navbar from './atom/Navbar';
import Home from './pages/Home/Home';
import {useSelector} from 'react-redux';

import BannerIndex from '../components/pages/Banner/Index';
import BannerForm from '../components/pages/Banner/Form';
import LoginPage from '../components/pages/Auth/Login';
import LogoutPage from '../components/pages/Auth/Logout';
import DepartementIndex from '../components/pages/Departement/Index';
import DepartementForm from '../components/pages/Departement/Form';
import JabatanIndex from '../components/pages/Jabatan/Index';
import JabatanForm from '../components/pages/Jabatan/Form';

const Login = [
    { path: '/login', element: <LoginPage/>, key: 1 }
]

const Logout = [
    { path: '/logout', element: <LogoutPage />, key: 1 }
]

const Banner = [
    { path: '/banner', element: <BannerIndex/>, key: 1 }, 
    { path: '/banner/form', element: <BannerForm />, key: 2 },
    { path: '/banner/form/:id', element: <BannerForm />, key: 3 }
]

const Departement = [
    { path: '/departement', element: <DepartementIndex/>, key: 1 }, 
    { path: '/departement/form', element: <DepartementForm />, key: 2 },
    { path: '/departement/form/:id', element: <DepartementForm />, key: 3 }
]

const Jabatan = [
    { path: '/jabatan', element: <JabatanIndex/>, key: 1 }, 
    { path: '/jabatan/form', element: <JabatanForm />, key: 2 },
    { path: '/jabatan/form/:id', element: <JabatanForm />, key: 3 }
]

const Main = () => {

    let { user } = useSelector(state => state.auth);

    return (
        <Router>
        {user && <Sidebar />}
        <div className='page-wrapper'>
            <Navbar />
            <div className='page-content'>
            <Routes>
                {/* GUARD ROUTE */}
                <Route exact path='/' element={ user ? <Home/> : <Navigate to="/login"/> }></Route>
                { Banner.map( props => <Route key={props.key} path={props.path} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Departement.map( props => <Route key={props.key} path={props.path} element={ user ? props.element : <Navigate to="/login"/> } /> )}
                { Jabatan.map( props => <Route key={props.key} path={props.path} element={ user ? props.element : <Navigate to="/login"/> } /> )}

                { Logout.map(props => <Route key={props.key} path={props.path} element={ user ? props.element : <Navigate to="/login"/> } /> )} 
                {/* GUEST ROUTE */}
                { Login.map(props => <Route key={props.key} path={props.path} element={ props.element } /> )}
            </Routes>
            </div>
        </div>
    </Router>
    )
}

export default Main
