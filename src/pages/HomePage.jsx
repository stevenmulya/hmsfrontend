import React from 'react';
import HomeSectionA from '../components/home/HomeSectionA';
import HomeSectionB from '../components/home/HomeSectionB';
import HomeSectionC from '../components/home/HomeSectionC';
import HomeSectionD from '../components/home/HomeSectionD';
import HomeSectionE from '../components/home/HomeSectionE';
import HomeSectionF from '../components/home/HomeSectionF';

export default function HomePage() {
  return (
    <div>
      <HomeSectionA /> {/* Hero Banner */}
      <HomeSectionB /> {/* Key Points */}
      <HomeSectionC /> {/* Products */}
      <HomeSectionD /> {/* Activities */}
      <HomeSectionE /> {/* News & Events */}
      <HomeSectionF /> {/* Our Partners */}
    </div>
  );
}