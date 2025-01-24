import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './styles/RelatedDoctors.module.scss';

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className={styles.relatedDoctorsContainer}>
      <h1 className={styles.title}>Related Doctors</h1>
      <p className={styles.description}>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className={styles.gridContainer}>
        {relDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className={styles.card}
            key={index}
          >
            <img className={styles.image} src={item.image} alt={item.name} />
            <div className={styles.content}>
              <div
                className={`${styles.availability} ${
                  item.available ? styles.available : styles.notAvailable
                }`}
              >
                <span className={styles.status}></span>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className={styles.name}>{item.name}</p>
              <p className={styles.speciality}>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Uncomment if you want to include the "More" button */}
      {/* <button className={styles.moreButton}>More</button> */}
    </div>
  );
};

export default RelatedDoctors;
