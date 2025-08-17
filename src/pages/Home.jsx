import React from 'react';
import TourZoneBanner from '../commponets/TourZoneBanner';
import OverviewSection from '../commponets/OverviewSection';
import TourismTabs from './TourismTabs';
import TourismExtras from './TourismExtras';
import TouristrandomStoie from './TouristrandomStoie';
import Newsletter from './Newsletter/Newsletter';
import StorySection from './StorySection/StorySection';

const Home = () => {
    return (
        <div className='mt-10'>
          <TourZoneBanner></TourZoneBanner> 
          <OverviewSection></OverviewSection> 
         
          <StorySection></StorySection>
          {/* <TouristrandomStoie></TouristrandomStoie> */}
           <TourismTabs></TourismTabs>
          <TourismExtras></TourismExtras>
          <Newsletter></Newsletter>
        </div>
    );
};

export default Home;