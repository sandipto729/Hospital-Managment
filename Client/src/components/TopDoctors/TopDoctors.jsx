import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './styles/TopDoctors.module.scss';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className={styles.topDoctorsContainer}>
      <h1 className={styles.title}>Top Doctors to Book</h1>
      <p className={styles.description}>Simply browse through our extensive list of trusted doctors.</p>
      <div className={styles.doctorGrid}>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className={styles.doctorCard}
            key={index}
          >
            <img className={styles.image} src={item.image} alt={item.name} />
            <div className={styles.info}>
              <div
                className={`${styles.availability} ${
                  item.available ? styles.available : styles.unavailable
                }`}
              >
                <span
                  className={`${styles.statusDot} ${
                    item.available ? styles.available : styles.unavailable
                  }`}
                />
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.speciality}>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className={styles.moreButton}
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
