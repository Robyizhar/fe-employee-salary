import React,{ useState, Fragment } from 'react';
import {Link, useLocation} from 'react-router-dom';
// import { useSelector } from 'react-redux';

const Sidebar = () => {

    const [active, setActive] = useState('');

    const sidebarToggle = () => {
        active === '' ? setActive('active') : setActive('');
        active === '' ? document.body.classList.add('sidebar-folded') : document.body.classList.remove('sidebar-folded'); 
    }
    
    // let { user } = useSelector(state => state.auth);

    const location = useLocation();

    return (
        <Fragment>
            <nav className="sidebar">
                <div className="sidebar-header">
                    {/* <span>{user.name}</span> */}
                    <div className={`${active === "active" ? 'sidebar-toggler active' : 'sidebar-toggler not-active'}`} onClick={sidebarToggle}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="sidebar-body">
                    <ul className="nav">
                        <li className="nav-item nav-category">Main</li>

                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}> 
                                <i className="bi bi-border-style"></i>
                                <span className="link-title">Dashboard</span> 
                            </Link>
                        </li>
                        <li className="nav-item nav-category">Master Data</li>
                        <li className="nav-item">
                            <Link to="/departement" className={`nav-link ${location.pathname === '/departement' && 'active'}`}> 
                                <i className="bi bi-newspaper"></i>
                                <span className="link-title">Depertement</span> 
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <Link to="/jabatan" className={`nav-link ${location.pathname === '/jabatan' && 'active'}`}> 
                                <i className="bi bi-newspaper"></i>
                                <span className="link-title">Depertement</span> 
                            </Link> 
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="collapse" href="#emails" role="button" aria-expanded="false" aria-controls="emails">
                                <i className="link-icon" data-feather="mail"></i>
                                <span className="link-title">Email</span>
                                <i className="link-arrow" data-feather="chevron-down"></i>
                            </a>
                            <div className="collapse" id="emails">
                            <ul className="nav sub-menu">
                                <li className="nav-item">
                                    <a href="pages/email/inbox.html" className="nav-link">Inbox</a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/email/read.html" className="nav-link">Read</a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/email/compose.html" className="nav-link">Compose</a>
                                </li>
                            </ul>
                            </div>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </Fragment>
    )
}

export default Sidebar