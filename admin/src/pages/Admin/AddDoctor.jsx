import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import styles from './styles/AddDoctor.module.scss';

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const { backendUrl } = useContext(AppContext);
  const { aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error('Image Not Selected');
      }

      const formData = new FormData();
      formData.append('image', docImg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: { aToken },
      });

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName('');
        setPassword('');
        setEmail('');
        setAddress1('');
        setAddress2('');
        setDegree('');
        setAbout('');
        setFees('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={styles.container}>
      <p className={styles.title}>Add Doctor</p>

      <div className={styles['form-wrapper']}>
        <div className={styles['upload-section']}>
          <label htmlFor="doc-img">
            <img
              className={styles['upload-img']}
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className={styles['form-content']}>
          <div className={styles['form-column']}>
            <div className={styles['form-group']}>
              <label>Your name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label>Doctor Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label>Set Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label>Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Years</option>
                {/* Add more options here */}
              </select>
            </div>

            <div className={styles['form-group']}>
              <label>Fees</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="number"
                placeholder="Doctor fees"
                required
              />
            </div>
          </div>

          <div className={styles['form-column']}>
            <div className={styles['form-group']}>
              <label>Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastro</option>
              </select>
            </div>

            <div className={styles['form-group']}>
              <label>Degree</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Degree"
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label>Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="Address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="Address 2"
                required
              />
            </div>
          </div>
        </div>

        <div className={styles['about-section']}>
          <label>About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            rows={5}
            placeholder="Write about doctor"
          />
        </div>

        <button type="submit" className={styles['submit-btn']}>
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
