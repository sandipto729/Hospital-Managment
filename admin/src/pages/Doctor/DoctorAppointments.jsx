import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import styles from './styles/DoctorAppointments.module.scss';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>All Appointments</p>
      <div className={styles.appointments}>
        <div className={styles.header}>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className={styles.appointmentRow} key={index}>
            <p className={styles.index}>{index}</p>
            <div className={styles.patient}>
              <img src={item.userData.image} alt={item.userData.name} />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className={styles.payment}>{item.payment ? 'Online' : 'CASH'}</p>
            </div>
            <p className={styles.index}>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className={`${styles.status} ${styles.cancelled}`}>Cancelled</p>
            ) : item.isCompleted ? (
              <p className={`${styles.status} ${styles.completed}`}>Completed</p>
            ) : (
              <div className={styles.actions}>
                <img
                  onClick={() => cancelAppointment(item._id)}
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
