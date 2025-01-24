import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import styles from './styles/DoctorsList.module.scss';

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className={styles.container}>
      <h1>All Doctors</h1>
      <div className={styles.cardContainer}>
        {doctors.map((item, index) => (
          <div className={styles.card} key={index}>
            <img src={item.image} alt={item.name} />
            <div className={styles.info}>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.speciality}>{item.speciality}</p>
              <div className={styles.availability}>
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
