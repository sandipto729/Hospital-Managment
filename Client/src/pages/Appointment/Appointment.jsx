import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import RelatedDoctors from '../../components/RelatedDoctors/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './styles/Appointment.module.scss';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + '_' + month + '_' + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appointment');
      return navigate('/login');
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const slotDate = day + '_' + month + '_' + year;

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSolts();
    }
  }, [docInfo]);

  return docInfo ? (
    <div className={styles.container}>
      {/* ---------- Doctor Details ----------- */}
      <div className={styles.doctorDetails}>
        <div>
          <img className={styles.doctorImage} src={docInfo.image} alt="" />
        </div>

        <div className={styles.doctorInfo}>
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className={styles.doctorName}>
            {docInfo.name} <img className={styles.verifiedIcon} src={assets.verified_icon} alt="" />
          </p>
          <div className={styles.degree}>
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className={styles.experience}>{docInfo.experience}</button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className={styles.aboutHeader}>
              About <img className={styles.infoIcon} src={assets.info_icon} alt="" />
            </p>
            <p className={styles.aboutText}>{docInfo.about}</p>
          </div>

          <p className={styles.fee}>
            Appointment fee: <span className={styles.feeAmount}>{currencySymbol}{docInfo.fees}</span>{' '}
          </p>
        </div>
      </div>

      {/* Booking slots */}
      <div className={styles.bookingSlots}>
        <p>Booking slots</p>
        <div className={styles.slotDays}>
          {docSlots.length &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                key={index}
                className={`${styles.daySlot} ${slotIndex === index ? styles.activeDaySlot : ''}`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className={styles.slotTimes}>
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                key={index}
                className={`${styles.timeSlot} ${item.time === slotTime ? styles.activeTimeSlot : ''}`}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button onClick={bookAppointment} className={styles.bookButton}>
          Book an appointment
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
