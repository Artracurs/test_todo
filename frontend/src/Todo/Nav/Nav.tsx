import s from './Nav.module.scss';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <nav className={s.container}>
            <div></div>
            <div className={s.navbarBrand}>
                <div className={s.logo}></div>
            </div>
            <ul className={s.navLinks}>
                <li><Link to="/tasks">Tasks</Link></li>
                <li><Link to="/completed">Completed</Link></li>
                <li><Link to="/pending">Pending</Link></li>
                <li><Link to="/inprogress">Progress</Link></li>
            </ul>
            <div></div>
        </nav>
    );
};

export default Nav;