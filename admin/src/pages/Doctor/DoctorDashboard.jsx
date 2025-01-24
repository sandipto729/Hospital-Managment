import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import styles from './styles/DoctorDashboard.module.scss'

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className={styles.dashboardContainer}>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} ${styles.hoverEffect}`}>
          <img className={styles.cardIcon} src={assets.earning_icon} alt="" />
          <div>
            <p className={styles.cardValue}>{currency} {dashData.earnings}</p>
            <p className={styles.cardLabel}>Earnings</p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.hoverEffect}`}>
          <img className={styles.cardIcon} src={assets.appointments_icon} alt="" />
          <div>
            <p className={styles.cardValue}>{dashData.appointments}</p>
            <p className={styles.cardLabel}>Appointments</p>
          </div>
        </div>
        <div className={`${styles.card} ${styles.hoverEffect}`}>
          <img className={styles.cardIcon} src={assets.patients_icon} alt="" />
          <div>
            <p className={styles.cardValue}>{dashData.patients}</p>
            <p className={styles.cardLabel}>Patients</p>
          </div>
        </div>
      </div>

      <div className={styles.latestBookings}>
        <div className={styles.latestBookingsHeader}>
          <img src={assets.list_icon} alt="" />
          <p className={styles.latestBookingsTitle}>Latest Bookings</p>
        </div>

        <div className={styles.latestBookingsList}>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div className={styles.bookingItem} key={index}>
              <img className={styles.bookingAvatar} src={item.userData.image} alt="" />
              <div className={styles.bookingInfo}>
                <p className={styles.bookingName}>{item.userData.name}</p>
                <p className={styles.bookingDate}>Booking on {slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                <p className={styles.bookingCancelled}>Cancelled</p>
              ) : item.isCompleted ? (
                <p className={styles.bookingCompleted}>Completed</p>
              ) : (
                <div className={styles.bookingActions}>
                  <img onClick={() => cancelAppointment(item._id)} className={styles.actionIcon} src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className={styles.actionIcon} src={assets.tick_icon} alt="Complete" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
