import React from 'react'
import Header from '../components/common/Header'
import Features from '../components/common/Features'
import Quality from '../components/common/Quality'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div className='w-full'>
      <Navbar/>
      <Header/> 
      <Quality/>
      <Features/> 
      <Footer/>
     
    </div>
  )
}

export default Home