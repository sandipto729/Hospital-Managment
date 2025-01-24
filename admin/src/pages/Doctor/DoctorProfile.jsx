import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import styles from './styles/DoctorProfile.module.scss'

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className={styles.doctorProfile}>
            <div className={styles.container}>
                <div className={styles.image}>
                    <img className={styles.imageBg} src={profileData.image} alt="Doctor" />
                </div>

                <div className={styles.info}>
                    <p className={styles.name}>{profileData.name}</p>
                    <div className={styles.degreeExperience}>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className={styles.experience}>{profileData.experience}</button>
                    </div>

                    <div className={styles.section}>
                        <p className={styles.sectionTitle}>About :</p>
                        <p className={styles.about}>
                            {isEdit
                                ? <textarea
                                    onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
                                    className={styles.textarea}
                                    rows={8}
                                    value={profileData.about}
                                />
                                : profileData.about
                            }
                        </p>
                    </div>

                    <p className={styles.fees}>
                        Appointment fee: <span>{currency} {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
                    </p>

                    <div className={styles.address}>
                        <p>Address:</p>
                        <p>
                            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                    </div>

                    <div className={styles.availability}>
                        <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label>Available</label>
                    </div>

                    {
                        isEdit
                            ? <button onClick={updateProfile} className={styles.buttonSave}>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className={styles.buttonEdit}>Edit</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile
