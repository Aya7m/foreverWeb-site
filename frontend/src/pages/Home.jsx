import React from 'react'
import Hero from '../components/Hero'
import LatestPage from '../components/LatestPage'
import BestSeller from '../components/BestSeller'
import OurPolice from '../components/OurPolice'
import NewLitter from '../components/NewLitter'

const Home = () => {
  return (
    <div>
        <Hero/>
        <LatestPage/>
        <BestSeller/>
        <OurPolice/>
        <NewLitter/>
    </div>
  )
}

export default Home