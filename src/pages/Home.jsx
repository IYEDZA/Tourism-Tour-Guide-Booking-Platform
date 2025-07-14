import React from 'react';
import TourZoneBanner from '../commponets/TourZoneBanner';
import OverviewSection from '../commponets/OverviewSection';
import TourismTabs from './TourismTabs';
import TourismExtras from './TourismExtras';
import TouristrandomStoie from './TouristrandomStoie';

const Home = () => {
    return (
        <div>
          <TourZoneBanner></TourZoneBanner> 
          <OverviewSection></OverviewSection> 
          <TourismTabs></TourismTabs>
          <TouristrandomStoie></TouristrandomStoie>
          <TourismExtras></TourismExtras>
        </div>
    );
};

export default Home;