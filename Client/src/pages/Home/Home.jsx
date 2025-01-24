import React from 'react'
import Header from '../../components/Header/Header'
import SpecialityMenu from '../../components/SpecialityMenu/SpecialityMenu'
import TopDoctors from '../../components/TopDoctors/TopDoctors'
import Banner from '../../components/Banner/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home