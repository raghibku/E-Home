import React from 'react'
import Banner from './Banner'
import Advertisement from './Advertisement'
import LatestReviews from './LatestReviews'
import FAQ from './FAQ'
import AboutUs from './AboutUs'

const Home = () => {
  return (
    <div>
      <Banner/>
      <Advertisement/>
      <AboutUs/>
      <LatestReviews/>
      <FAQ/>
    </div>
  )
}

export default Home