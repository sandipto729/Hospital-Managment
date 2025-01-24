import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Banner.module.scss';
import { assets } from '../../assets/assets';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.bannerContainer}>
      {/* Left Section */}
      <div className={styles.leftContent}>
        <h1 className={styles.title}>Book Your Appointment</h1>
        <p className={styles.subtitle}>With Over 100 Trusted Doctors</p>
        <button
          onClick={() => {
            navigate('/login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={styles.ctaButton}
        >
          Create Account
        </button>
      </div>

      {/* Right Section */}
      <div className={styles.rightContent}>
        <video
          className={styles.bannerVideo}
          src="https://media.istockphoto.com/id/458659818/video/female-doctor-leads-a-meeting-with-professionals.mp4?s=mp4-640x640-is&k=20&c=3-jK91PhCSozjiQeYvTNJjHllJ-l_FqgSOlHGn7Vh5A="
          alt="Book an Appointment"
          autoPlay
          loop
          muted
          controls={false} 
        ></video>
      </div>

    </div>
  );
};

export default Banner;
