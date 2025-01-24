// import React, { useContext, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AppContext } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { assets } from '../../assets/assets';
// import styles from './styles/MyAppointments.module.scss';

// const MyAppointments = () => {
//   const { backendUrl, token } = useContext(AppContext);
//   const navigate = useNavigate();

//   const [appointments, setAppointments] = useState([]);
//   const [payment, setPayment] = useState('');

//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split('_');
//     return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
//   };

//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
//       setAppointments(data.appointments.reverse());
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers: { token } });
//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const initPay = (order) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: 'Appointment Payment',
//       description: 'Appointment Payment',
//       order_id: order.id,
//       receipt: order.receipt,
//       handler: async (response) => {
//         try {
//           const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, response, { headers: { token } });
//           if (data.success) {
//             navigate('/my-appointments');
//             getUserAppointments();
//           }
//         } catch (error) {
//           console.error(error);
//           toast.error(error.message);
//         }
//       },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const appointmentRazorpay = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/payment-razorpay`, { appointmentId }, { headers: { token } });
//       if (data.success) {
//         initPay(data.order);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   const appointmentStripe = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/payment-stripe`, { appointmentId }, { headers: { token } });
//       if (data.success) {
//         window.location.replace(data.session_url);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);

//   return (
//     <div className={styles.myAppointmentsContainer}>
//       <p className={styles.header}>My appointments</p>
//       <div>
//         {appointments.map((item, index) => (
//           <div key={index} className={styles.appointmentCard}>
//             <div className={styles.imageWrapper}>
//               <img className={styles.doctorImage} src={item.docData.image} alt="Doctor" />
//             </div>
//             <div className={styles.detailsWrapper}>
//               <p className={styles.doctorName}>{item.docData.name}</p>
//               <p className={styles.speciality}>{item.docData.speciality}</p>
//               <p className={styles.addressHeader}>Address:</p>
//               <p className={styles.address}>{item.docData.address.line1}</p>
//               <p className={styles.address}>{item.docData.address.line2}</p>
//               <p className={styles.dateTime}>
//                 <span className={styles.dateTimeHeader}>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
//               </p>
//             </div>
//             <div className={styles.actionsWrapper}>
//               {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
//                 <button
//                   onClick={() => setPayment(item._id)}
//                   className={styles.payButton}
//                 >
//                   Pay Online
//                 </button>
//               )}
//               {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
//                 <>
//                   <button
//                     onClick={() => appointmentStripe(item._id)}
//                     className={styles.paymentOptionButton}
//                   >
//                     <img className={styles.paymentLogo} src={assets.stripe_logo} alt="Stripe" />
//                   </button>
//                   <button
//                     onClick={() => appointmentRazorpay(item._id)}
//                     className={styles.paymentOptionButton}
//                   >
//                     <img className={styles.paymentLogo} src={assets.razorpay_logo} alt="Razorpay" />
//                   </button>
//                 </>
//               )}
//               {!item.cancelled && item.payment && !item.isCompleted && (
//                 <button className={styles.paidButton}>Paid</button>
//               )}
//               {item.isCompleted && (
//                 <button className={styles.completedButton}>Completed</button>
//               )}
//               {!item.cancelled && !item.isCompleted && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className={styles.cancelButton}
//                 >
//                   Cancel appointment
//                 </button>
//               )}
//               {item.cancelled && !item.isCompleted && (
//                 <button className={styles.cancelledButton}>Appointment cancelled</button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;



import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from './../../assets/assets'

const MyAppointments = () => {

  const { backendUrl, token } = useContext(AppContext)
  const navigate = useNavigate()

  const [appointments, setAppointments] = useState([])
  const [payment, setPayment] = useState('')

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  // Getting User Appointments Data Using API
  const getUserAppointments = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      setAppointments(data.appointments.reverse())

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to cancel appointment Using API
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {

        console.log(response)

        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
          if (data.success) {
            navigate('/my-appointments')
            getUserAppointments()
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Function to make payment using razorpay
  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // Function to make payment using stripe
  const appointmentStripe = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
      if (data.success) {
        const { session_url } = data
        window.location.replace(session_url)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 text-lg font-medium text-gray-300 border-b border-gray-600'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-gray-700'
          >
            <div>
              <img
                className='w-36 bg-gray-800 p-2 rounded'
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className='flex-1 text-sm text-gray-400'>
              <p className='text-white text-base font-semibold'>
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className='text-gray-300 font-medium mt-1'>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className='mt-1'>
                <span className='text-sm text-gray-300 font-medium'>
                  Date & Time:
                </span>{' '}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment !== item._id && (
                  <button
                    onClick={() => setPayment(item._id)}
                    className='text-gray-300 sm:min-w-48 py-2 border border-gray-600 rounded hover:bg-blue-500 hover:text-white transition-all duration-300'
                  >
                    Pay Online
                  </button>
                )}
              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment === item._id && (
                  <button
                    onClick={() => appointmentStripe(item._id)}
                    className='text-gray-300 sm:min-w-48 py-2 border border-gray-600 rounded hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center'
                  >
                    <img
                      className='max-w-20 max-h-5'
                      src={assets.stripe_logo}
                      alt=""
                    />
                  </button>
                )}
              {!item.cancelled &&
                !item.payment &&
                !item.isCompleted &&
                payment === item._id && (
                  <button
                    onClick={() => appointmentRazorpay(item._id)}
                    className='text-gray-300 sm:min-w-48 py-2 border border-gray-600 rounded hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center justify-center'
                  >
                    <img
                      className='max-w-20 max-h-5'
                      src={assets.razorpay_logo}
                      alt=""
                    />
                  </button>
                )}
              {!item.cancelled &&
                item.payment &&
                !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border rounded text-gray-300 bg-gray-700'>
                    Paid
                  </button>
                )}
              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-400'>
                  Completed
                </button>
              )}
              {!item.cancelled &&
                !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className='text-gray-300 sm:min-w-48 py-2 border border-red-500 rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                  >
                    Cancel appointment
                  </button>
                )}
              {item.cancelled &&
                !item.isCompleted && (
                  <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                    Appointment cancelled
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default MyAppointments