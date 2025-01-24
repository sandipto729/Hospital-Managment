import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { DoctorContext } from '../context/DoctorContext';
import { AdminContext } from '../context/AdminContext';
import styles from './styles/Sidebar.module.scss';

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className={styles.sidebar}>
      {aToken && (
        <ul className={styles.menu}>
          <NavLink
            to={'/admin-dashboard'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.home_icon} alt="" />
            <p className={styles.text}>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/all-appointments'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.appointment_icon} alt="" />
            <p className={styles.text}>Appointments</p>
          </NavLink>
          <NavLink
            to={'/add-doctor'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.add_icon} alt="" />
            <p className={styles.text}>Add Doctor</p>
          </NavLink>
          <NavLink
            to={'/doctor-list'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.people_icon} alt="" />
            <p className={styles.text}>Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className={styles.menu}>
          <NavLink
            to={'/doctor-dashboard'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.home_icon} alt="" />
            <p className={styles.text}>Dashboard</p>
          </NavLink>
          <NavLink
            to={'/doctor-appointments'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.appointment_icon} alt="" />
            <p className={styles.text}>Appointments</p>
          </NavLink>
          <NavLink
            to={'/doctor-profile'}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <img className={styles.icon} src={assets.people_icon} alt="" />
            <p className={styles.text}>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
