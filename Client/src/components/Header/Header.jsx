import React from 'react';
import styles from './styles/Header.module.scss';
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      {/* --------- Header Left --------- */}
      <div className={styles.leftSection}>
        <p className={styles.title}>
          Schedule Your Appointment <br /> with Expert Doctors
        </p>
        <div className={styles.description}>
          <img className={styles.profileImage} src={assets.group_profiles} alt="Profiles" />
          <p className="text">
            Browse our curated list of experienced and reliable healthcare professionals. <br />
            Make your appointment with just a few clicks—quick and convenient!
          </p>
        </div>
        <a
          href="#speciality"
          className={styles.ctaButton}
        >
          Get Started
          <img className={styles.arrowIcon} src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className={styles.rightSection}>
        <img 
          className={styles.headerImage} 
          src="https://media.istockphoto.com/id/956989024/photo/young-beautiful-focused-female-worker-in-sterile-cloths-using-a-tablet-to-check-correction-of.jpg?s=1024x1024&w=is&k=20&c=JRFDSNUCTQUaMLKLOxccHi7p8qQ4SM5TWQHofbWcfP4=" 
          alt="Healthcare Professional" 
        />
      </div>
    </div>
  );
};

export default Header;
