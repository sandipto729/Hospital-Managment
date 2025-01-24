import React, { useEffect } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import styles from './styles/AllAppointments.module.scss';

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>All Appointments</p>

      <div className={styles.tableContainer}>
        <div className={styles.headerRow}>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className={styles.row} key={index}>
            <p className={styles.hidden}>{index + 1}</p>
            <div className={styles.patient}>
              <img src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className={styles.hidden}>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className={styles.doctor}>
              <img src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className={styles.statusCancelled}>Cancelled</p>
            ) : item.isCompleted ? (
              <p className={styles.statusCompleted}>Completed</p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className={styles.cancelIcon}
                src={assets.cancel_icon}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
