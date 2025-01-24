import React from 'react';
import { assets } from '../../assets/assets';
import styles from './styles/Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img className={styles.logo} src={assets.logo} alt="Logo" />
          <p className={styles.description}>
            We are committed to providing the best medical care with a focus on quality, accessibility, and innovation. 
            Our goal is to make healthcare easier and more efficient for everyone, empowering you to take control of 
            your health and well-being.
          </p>
        </div>

        <div className={styles.companySection}>
          <p className={styles.title}>COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <p className={styles.title}>CONTACT</p>
          <ul>
            <li>+91-9476455131</li>
            <li>sr.23cs8002@nitdgp.ac.in</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <hr />
        <p>&copy; 2024 Med Manage. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
