import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logoLink}>
                    <Logo />
                </Link>
                <div className={styles.menu}>
                    <Link to="/chunks" className={styles.menuItem}>
                        英语块学习
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 