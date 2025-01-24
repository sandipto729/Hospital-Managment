// import React from 'react';
// import { assets } from '../../assets/assets';
// import styles from './styles/About.module.scss';

// const About = () => {
//   return (
//     <div className={styles.aboutContainer}>
//       {/* About Us Section */}
//       <div className={styles.aboutHeader}>
//         <p>
//           ABOUT <span className={styles.highlight}>US</span>
//         </p>
//       </div>

//       <div className={styles.aboutContent}>
//         <img className={styles.aboutImage} src={assets.about_image} alt="About Us" />
//         <div className={styles.aboutText}>
//           <p>
//             Welcome to med-manage, your trusted partner in managing your healthcare needs
//             conveniently and efficiently. At med-manage, we understand the challenges
//             individuals face when it comes to scheduling doctor appointments and managing
//             their health records.
//           </p>
//           <p>
//             med-manage is committed to excellence in healthcare technology. We
//             continuously strive to enhance our platform, integrating the latest advancements
//             to improve user experience and deliver superior service. Whether you're booking
//             your first appointment or managing ongoing care, med-manage is here to support
//             you every step of the way.
//           </p>
//           <b className={styles.visionTitle}>Our Vision</b>
//           <p>
//             Our vision at med-manage is to create a seamless healthcare experience for every
//             user. We aim to bridge the gap between patients and healthcare providers, making
//             it easier for you to access the care you need, when you need it.
//           </p>
//         </div>
//       </div>

//       {/* Why Choose Us Section */}
//       <div className={styles.chooseUsHeader}>
//         <p>
//           WHY <span className={styles.highlight}>CHOOSE US</span>
//         </p>
//       </div>

//       <div className={styles.featuresContainer}>
//         <div className={styles.featureCard}>
//           <b>EFFICIENCY:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>
//         <div className={styles.featureCard}>
//           <b>CONVENIENCE:</b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>
//         <div className={styles.featureCard}>
//           <b>PERSONALIZATION:</b>
//           <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;

import React from 'react';
import { assets } from '../../assets/assets';
import styles from './styles/About.module.scss';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      {/* About Us Section */}
      <div className={styles.sectionHeader}>
        <p>
          WHO <span className={styles.highlight}>WE ARE</span>
        </p>
      </div>

      <div className={styles.aboutContent}>
        <video
          className={styles.aboutImage}
          src="https://media.istockphoto.com/id/1498919348/video/two-neuroscientists-working-with-computer-powered-animated-vfx-hologram-of-human-brain-and.mp4?s=mp4-640x640-is&k=20&c=B98z9Rk5X1rF40CoZES3vdEV60yxwP6vVKIoLTcCjXM="
          alt="About Our Journey"
          loop
          muted
          autoPlay // Optional: if you want the video to start automatically
          // controls // Optional: if you want to show controls (remove `controls={false}` if not needed)
        />

        <div className={styles.aboutText}>
          <p>
            At <span className={styles.brandName}>med-manage</span>, we’re rewriting the rules
            of healthcare convenience. Forget the endless wait times, confusing records,
            and complicated processes—step into a world where managing your health is
            a breeze!
          </p>
          <p>
            From effortless appointment scheduling to secure health record management,
            we’re your digital partner in staying healthy, happy, and stress-free.
            <b>Welcome to the future of healthcare—designed for you.</b>
          </p>
          <div className={styles.visionSection}>
            <b>Our Big Dream</b>
            <p>
              To create a world where healthcare feels personal, accessible, and simple.
              We believe everyone deserves top-notch care without the hassle.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className={styles.sectionHeader}>
        <p>
          WHY <span className={styles.highlight}>CHOOSE US</span>
        </p>
      </div>

      <div className={styles.featuresContainer}>
        {[
          {
            title: 'LIGHTNING FAST',
            description: 'Book appointments in seconds, no more waiting!',
          },
          {
            title: 'SMART & SIMPLE',
            description: 'Your health records organized, just a click away.',
          },
          {
            title: 'ALWAYS HERE',
            description: '24/7 support to keep you covered anytime, anywhere.',
          },
        ].map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <b>{feature.title}</b>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
