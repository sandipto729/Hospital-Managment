import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './styles/Navbar.module.scss';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className={styles.navbar}>
      <img onClick={() => navigate('/')} className={styles.logo} src={assets.logo} alt="Logo" />
      <ul className={styles.navLinks}>
        <NavLink to="/">
          <li>HOME</li>
          <hr />
        </NavLink>
        <NavLink to="/doctors">
          <li>ALL DOCTORS</li>
          <hr />
        </NavLink>
        <NavLink to="/about">
          <li>ABOUT</li>
          <hr />
        </NavLink>
        <NavLink to="/contact">
          <li>CONTACT</li>
          <hr />
        </NavLink>
        <NavLink to="/nearest-hospitals">
          <li>NEAREST HOSPITALS</li>
          <hr />
        </NavLink>
        <NavLink to="/meet">
          <li>MEET</li>
          <hr />
        </NavLink>
      </ul>

      <div className={styles.actions}>
        {token && userData ? (
          <div className={styles.profileMenu}>
            <img className={styles.profileImage} src={userData.image} alt="User" />
            <img className={styles.dropdownIcon} src={assets.dropdown_icon} alt="Dropdown Icon" />
            <div className={styles.dropdown}>
              <p onClick={() => navigate('/my-profile')}>My Profile</p>
              <p onClick={() => navigate('/my-appointments')}>My Appointments</p>
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className={styles.createAccount}
          >
            Create account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className={styles.menuIcon}
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      <div className={`${styles.mobileMenu} ${!showMenu ? 'hidden' : ''}`}>
        <div className={styles.header}>
          <img src={assets.logo} alt="Logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className={styles.closeIcon}
            alt="Close Icon"
          />
        </div>
        <ul className={styles.menuLinks}>
          <NavLink onClick={() => setShowMenu(false)} to="/">
            <p>HOME</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">
            <p>ALL DOCTORS</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">
            <p>ABOUT</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">
            <p>CONTACT</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
