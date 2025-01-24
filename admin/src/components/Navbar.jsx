import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Navbar.module.scss';

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext);
  const { aToken, setAToken } = useContext(AdminContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img
          onClick={() => navigate('/')}
          className={styles.logo}
          src={assets.admin_logo}
          alt=""
        />
        <p className={styles.role}>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button onClick={() => logout()} className={styles.logout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
