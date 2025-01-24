import React from 'react';
import { assets } from '../../assets/assets';
import styles from './styles/Contact.module.scss';

const Contact = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Header Section */}
      <div className={styles.contactHeader}>
        <p>
          GET IN <span className={styles.highlight}>TOUCH</span>
        </p>
      </div>

      {/* Contact Content Section */}
      <div className={styles.contactContent}>
        <img className={styles.contactImage} src='https://media.istockphoto.com/id/1366686036/photo/doctors-laugh-and-talk-in-the-hallway-older-woman-and-young-female-doctors.jpg?s=1024x1024&w=is&k=20&c=rBnRahyv5BYKmAPPIHVC8OiRgFmwqhYy-UZAU7zw0I0=' alt="Contact Us" />
        <div className={styles.contactDetails}>
          <p className={styles.sectionTitle}>OUR LOCATION</p>
          <p className={styles.sectionText}>
            NIT Durgapur <br /> Durgapur <br /> West Bengal, India, 713209
          </p>
          <p className={styles.sectionText}>
            Phone: (+91) 9476455131 <br /> Email: sr.23cs8002@nitdgp.ac.in
          </p>
          <p className={styles.sectionTitle}>JOIN OUR TEAM</p>
          <p className={styles.sectionText}>
            Discover opportunities to work with us and be part of something amazing.
          </p>
          <button className={styles.exploreJobsButton}>Explore Career Opportunities</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
