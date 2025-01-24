import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import styles from './styles/Dashboard.module.scss';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className={styles.container}>
        {/* Cards Section */}
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <img src={assets.doctor_icon} alt="Doctors" />
            <div className={styles.info}>
              <p className={styles.count}>{dashData.doctors}</p>
              <p className={styles.label}>Doctors</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={assets.appointments_icon} alt="Appointments" />
            <div className={styles.info}>
              <p className={styles.count}>{dashData.appointments}</p>
              <p className={styles.label}>Appointments</p>
            </div>
          </div>
          <div className={styles.card}>
            <img src={assets.patients_icon} alt="Patients" />
            <div className={styles.info}>
              <p className={styles.count}>{dashData.patients}</p>
              <p className={styles.label}>Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings Section */}
        <div className={styles.latestBookings}>
          <div className={styles.header}>
            <img src={assets.list_icon} alt="Latest Bookings" />
            <p>Latest Bookings</p>
          </div>

          <div className={styles.bookingsList}>
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div className={styles.bookingItem} key={index}>
                <img src={item.docData.image} alt={item.docData.name} />
                <div className={styles.details}>
                  <p className={styles.name}>{item.docData.name}</p>
                  <p className={styles.date}>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className={styles.statusCancelled}>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className={styles.statusCompleted}>Completed</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className={styles.cancelIcon}
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
